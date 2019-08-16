import Validator, { IPathValidateFnMap } from './validator-class';

export { Validator };

export default function buildValidator<M>(
  model: M,
  pathValidateFnMap: IPathValidateFnMap<M>,
): Validator<M> {
  // validator 的字段是 @computed get 的方式，监听model字段
  // 目前没找到好方法对其进行 iteration, 只能塞个字段记录所有的keys
  const validator = new Validator<M>(model, pathValidateFnMap);
  return validator;
}
