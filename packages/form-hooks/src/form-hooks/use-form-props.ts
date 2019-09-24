import get from 'lodash/get';
import { ICommonFormOuterProps, ValidateFn } from './types';
import { omitCommonProps } from './utils';

const identity = (e: any) => e;

export function useFormProps<M>(props: ICommonFormOuterProps<M>) {
  const model = props.model!;
  const path = props.path!;
  const getValue = props.getValue;

  const transformModelToView = props.transformModelToView || identity;
  const transformViewToModel = props.transformViewToModel || identity;
  function handleChange(changeValue: any) {
    const value = transformViewToModel(changeValue, props);
    const sharedParam = {
      model,
      value,
      path,
    };

    if (props.beforeChange) {
      const oldValue = getValue(model.data, path);
      const beforeCheckResult = props.beforeChange({
        ...sharedParam,
        oldValue,
      });
      if (beforeCheckResult === false) {
        return;
      }
    }

    const defaultChangeFn = () => {
      model.update(path, value);
      if (props.afterChange) {
        props.afterChange({
          ...sharedParam,
        });
      }
    };

    if (props.onChange) {
      props.onChange({
        ...sharedParam,
        defaultChangeFn,
      });
    } else {
      defaultChangeFn();
    }
  }

  const modelValue = getValue(model.data, path as any);
  const formValue = transformModelToView(modelValue, props);

  const inputProps = {
    ...props.inputPropsFromContext,
    ...omitCommonProps(props),
  };
  const itemProps = props.itemProps
    ? {
        ...props.itemProps,
      }
    : {};

  return {
    ...props,
    itemProps,
    inputProps,
    value: formValue,
    onChange: handleChange,
    clear() {
      // if (rules) {
      //   props.validateInfoManager.clearValidInfo(props.model, props.path);
      // }
    },
  };
}
