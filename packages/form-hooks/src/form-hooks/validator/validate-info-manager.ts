import { validateHasError } from './utils';

export class ValidateInfoManager {
  isValid: boolean = true;
  validateInfo: Record<string, string | void> = {};

  setValidateInfo(path: string, validString: string | void) {
    this.validateInfo[path] = validString;
    this.reComputeValid();
  }

  clearValidInfo(path: string) {
    delete this.validateInfo[path];
    this.reComputeValid();
  }

  private reComputeValid() {
    const newValid = this.calculateValid();
    if (newValid !== this.isValid) {
      this.isValid = newValid;
    }
  }

  private calculateValid() {
    for (let key in this.validateInfo) {
      if (validateHasError(this.validateInfo[key])) {
        return false;
      }
    }

    return true;
  }
}
