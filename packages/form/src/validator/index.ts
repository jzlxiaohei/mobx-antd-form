import Validator, { IPathValidateFnMap } from './validator-class';

export { Validator };

export default function buildValidator<M>(
  model: M,
  pathValidateFnMap: IPathValidateFnMap<M>,
): Validator<M> {
  const validator = new Validator<M>(model, pathValidateFnMap);
  return validator;
}
