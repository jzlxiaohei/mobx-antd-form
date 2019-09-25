import { validateHasError } from './utils';
import EventEmitter from 'eventemitter3';

export class ValidateInfoManager {
  isValid: boolean = true;
  validateInfo: Record<string, string | void> = {};
  private EE = new EventEmitter();

  onValidChange(fn: (valid: boolean) => void) {
    this.EE.on('valid-change', fn);
  }

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
      this.EE.emit('valid-change', this.isValid);
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
