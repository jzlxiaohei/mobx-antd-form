import { extendObservable, computed } from 'mobx';
import get from 'lodash/get';

export type ValidateFn<M> = (value: any, model: M) => string | void;

export interface IPathValidateFnMap<M> {
  [path: string]: ValidateFn<M>;
}

interface IValidator {
  [path: string]: string | undefined;
}

function isString(str: any) {
  return typeof str === 'string' || str instanceof String;
}

function addValidatorForSingleField<M>(
  validateFns: ValidateFn<M> | ValidateFn<M>[],
  validator: IValidator,
  path: string,
  model: M,
) {
  if (path in validator) {
    console.error(`path: ${path} has been in validator, ignore`);
    return;
  }
  extendObservable(validator, {
    get [path]() {
      return validate(validateFns, path, model);
    },
  });
}

function validate<M>(
  validateFns: ValidateFn<M> | ValidateFn<M>[],
  path: string,
  model: M,
) {
  const value = get(model, path);
  const vFns = Array.isArray(validateFns) ? validateFns : [validateFns];
  for (let i = 0; i < vFns.length; i++) {
    const f = vFns[i];
    const fResult = f(value, model);
    if (isString(fResult)) {
      return fResult;
    }
  }
}

export default class Validator<M> {
  constructor(modelWatched: M, pathValidateFnMap: IPathValidateFnMap<M>) {
    this.modelWatched = modelWatched;
    this.initRules(pathValidateFnMap);
  }

  private modelWatched: M = null;

  private _validatorCache: IValidator = null;

  private validateKeys: string[] = [];

  private rules: IPathValidateFnMap<M> = null;

  private initRules(rules: IPathValidateFnMap<M>) {
    this._validatorCache = {};
    this.rules = rules;
    this.buildRules();
  }

  private buildRules() {
    const { modelWatched, _validatorCache } = this;
    const rules = this.rules;
    for (let path in rules) {
      if (rules.hasOwnProperty(path)) {
        const validateFns = rules[path];
        extendObservable(_validatorCache, {
          get [path]() {
            return validate(validateFns, path, modelWatched);
          },
        });
        this.validateKeys.push(path);
      }
    }
  }

  getValidStringByPath(path: string) {
    return get(this._validatorCache, path);
  }

  isValid() {
    const validateKeys = this.validateKeys;
    for (let i = 0; i < validateKeys.length; i++) {
      const path = validateKeys[i];
      const vResult = get(this._validatorCache, path);
      if (isString(vResult)) {
        return false;
      }
    }
    return true;
  }
}
