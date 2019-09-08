import { validateHasError } from '../utils';
import { decorate, observable } from 'mobx';

class ValidateInfo {
  model: any;
  info: Record<string, string | void> = {};
  isValid() {
    for (let key in this.info) {
      if (validateHasError(this.info[key]).error) {
        return false;
      }
    }
    return true;
  }
}

export class ValidateInfoManager {
  validateInfo: ValidateInfo[] = [];

  isValid: boolean = true;

  setValidateInfo(model: any, path: string, validString: string | void) {
    const foundInfo = this.validateInfo.find(vi => vi.model === model);
    if (foundInfo) {
      foundInfo.info[path] = validString;
    } else {
      const newInfo = new ValidateInfo();
      newInfo.model = model;
      newInfo.info[path] = validString;
      this.validateInfo.push(newInfo);
    }
    this.isValid = this.calculateValid();
  }

  clearValidInfo(model: any, path: string) {
    const foundInfo = this.validateInfo.find(vi => vi.model === model);
    if (foundInfo) {
      delete foundInfo.info[path];
    }
    this.isValid = this.calculateValid();
  }

  private calculateValid() {
    for (let vItem of this.validateInfo) {
      if (!vItem.isValid()) {
        return false;
      }
    }
    return true;
  }
}

decorate(ValidateInfoManager, {
  isValid: observable
});
