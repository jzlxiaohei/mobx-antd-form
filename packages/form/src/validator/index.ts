import { extendObservable, toJS } from 'mobx';
import get from 'lodash/get';

export type ValidateFn<M> = (value: any, model: M) => string | undefined;

export interface IValidator {
  [path: string]: string | undefined;
}

function isString(str: any) {
  return typeof str === 'string' || str instanceof String;
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

interface IPathValidateFnMap<M> {
  [path: string]: ValidateFn<M>;
}

export default function buildValidator<M>(
  model: M,
  pathValidateFnMap: IPathValidateFnMap<M>,
): IValidator {
  // validator 的字段
  const __do_not_use_this_hidden_keys__ = [];
  const validateObject: IValidator = {};
  for (let path in pathValidateFnMap) {
    if (pathValidateFnMap.hasOwnProperty(path)) {
      const validateFns = pathValidateFnMap[path];
      addValidatorForSingleField(validateFns, validateObject, path, model);
      __do_not_use_this_hidden_keys__.push(path);
    }
  }
  (validateObject as any).__do_not_use_this_hidden_keys__ = __do_not_use_this_hidden_keys__;
  return validateObject;
}

export function isValid(validator: IValidator) {
  const __do_not_use_this_hidden_keys__: string[] = (validator as any)
    .__do_not_use_this_hidden_keys__;
  for (let i = 0; i < __do_not_use_this_hidden_keys__.length; i++) {
    const path = __do_not_use_this_hidden_keys__[i];
    const vResult = get(validator, path);
    if (isString(vResult)) {
      return false;
    }
  }
  return true;
}
