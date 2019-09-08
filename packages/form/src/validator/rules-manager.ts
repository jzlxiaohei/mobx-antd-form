import { ValidateFn } from '../types';
import { isString, validateHasError } from '../utils';

class RuleManager {
  rulesRecord: Record<string, ValidateFn<any>> = {};

  add(key: string, ruleFn: ValidateFn<any>) {
    if (key in this.rulesRecord) {
      throw new Error(`rules: ${key} has been added`);
    }
    this.rulesRecord[key] = ruleFn;
    return this;
  }

  getRuleFn(key: string) {
    return this.rulesRecord[key];
  }

  checkTheRules(_rules: ValidateFn<any> | ValidateFn<any>[], value: any, model: any): string | any {
    const rules = Array.isArray(_rules) ? _rules : [_rules];
    for (let i = 0; i < rules.length; i++) {
      const singleRule = rules[i];
      let ruleFn = singleRule;
      if (isString(singleRule)) {
        ruleFn = this.getRuleFn((singleRule as unknown) as string);
        if (!ruleFn) {
          throw new Error(`rule: ${singleRule} is not registered`);
        }
      }
      const result = (ruleFn as Function)(value, model);
      if (validateHasError(result).error) {
        return result;
      }
    }
  }
}

export default new RuleManager();
