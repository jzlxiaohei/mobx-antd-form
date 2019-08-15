import { ICommonInputProps } from './types';
import get from 'lodash.get';
import set from 'lodash.set';
import { runInAction, isObservableProp } from 'mobx';

const ignoreFields = [
  'model',
  'path',
  'value',
  'onChange',
  'getValue',
  'transformViewToModel',
  'transformModelToView',
  'label',
  'itemProps',
  'noFormItem',
];

export function omitCommonProps(props: any) {
  const result = {} as any;
  for (let field in props) {
    if (props.hasOwnProperty(field) && ignoreFields.indexOf(field) === -1) {
      result[field] = props[field];
    }
  }
  return result;
}

export const identity = (e: any) => e;

export function getFormProps<M extends Object>(props: ICommonInputProps<M>) {
  const transformModelToView = props.transformModelToView || identity;
  const transformViewToModel = props.transformViewToModel || identity;
  const getValue = props.getValue || get;

  function handleChange(changeValue: any) {
    const value = transformViewToModel(changeValue, props);
    if (props.onChange) {
      props.onChange({
        value,
        model: props.model,
        path: props.path,
      });
    } else {
      runInAction(() => set(props.model, props.path, value));
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const { model, path } = props;
    const isNestedPropsPath = path.indexOf('.') !== -1;
    if (!isNestedPropsPath) {
      if (!isObservableProp(model, path)) {
        console.error(`value from ${props.path} is not observable`);
      }
    } else {
      const lastIndex = path.lastIndexOf('.');
      const firstPart = path.substring(0, lastIndex);
      const lastPart = path.substring(lastIndex + 1);
      const finalModel = get(model, firstPart);
      if (!isObservableProp(finalModel, lastPart)) {
        console.error(
          `nested value from ${props.path} is not observable. Maybe it works, but it is a potential bug`,
        );
      }
    }
  }

  const modelValue = getValue(props.model, props.path as any);
  const formValue = transformModelToView(modelValue, props);
  const inputProps = omitCommonProps(props);
  return {
    ...props,
    inputProps,
    value: formValue,
    onChange: handleChange,
  };
}
