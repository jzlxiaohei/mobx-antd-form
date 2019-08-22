import { isString } from '../utils';

class ValidateInfo {
  model: any;
  info: Record<string, string | void> = {};
  isValid() {
    for (let key in this.info) {
      if (isString(this.info[key])) {
        return false;
      }
    }
    return true;
  }
}

export class ValidateInfoManager {
  validateInfo: ValidateInfo[] = [];

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
  }

  isValid() {
    for (let vItem of this.validateInfo) {
      if (!vItem.isValid()) {
        return false;
      }
    }
    return true;
  }
}
