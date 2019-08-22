import get from 'lodash.get';
import set from 'lodash.set';
import {
  runInAction,
  isObservableProp,
  isObservable,
  isObservableObject,
} from 'mobx';
import { ICommonInputProps } from '../../types';

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
  'validator',
  'noFormItem',
  'needValidate',
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

  const { model, path } = props;

  function handleChange(changeValue: any) {
    const value = transformViewToModel(changeValue, props);
    if (props.onChange) {
      props.onChange({
        value,
        model,
        path,
        defaultChangeFn() {
          runInAction(() => set(model, path, value));
        },
      });
    } else {
      runInAction(() => set(model, path, value));
    }
  }

  // check value is observable
  if (process.env.NODE_ENV !== 'production') {
    if (!isObservable(model)) {
      console.error(`${model} is not observable`);
    }
    const isNestedPropsPath = path.indexOf('.') !== -1;
    if (!isNestedPropsPath) {
      if (isObservableObject(model) && !isObservableProp(model, path)) {
        console.error(`value from ${props.path} is not observable`);
      }
    } else {
      const lastIndex = path.lastIndexOf('.');
      const firstPart = path.substring(0, lastIndex);
      const lastPart = path.substring(lastIndex + 1);
      const finalModel = get(model, firstPart);
      if (
        isObservableObject(finalModel) &&
        !isObservableProp(finalModel, lastPart)
      ) {
        console.error(
          `nested value from ${props.path} is not observable. Maybe it works, but it is a potential bug`,
        );
      }
    }
  }

  const modelValue = getValue(model, path as any);
  const formValue = transformModelToView(modelValue, props);
  const inputProps = omitCommonProps(props);
  const itemProps = props.itemProps
    ? {
        ...props.itemProps,
      }
    : {};

  if (props.validator && props.needValidate) {
    const validator = props.validator;
    const help = validator.getValidStringByPath(path);
    itemProps.help = help;
    itemProps.validateStatus = help ? 'error' : undefined;
  }

  return {
    ...props,
    itemProps,
    inputProps,
    value: formValue,
    onChange: handleChange,
  };
}
