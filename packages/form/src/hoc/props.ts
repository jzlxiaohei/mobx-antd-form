import get from 'lodash/get';
import set from 'lodash/set';
import {
  runInAction,
  isObservableProp,
  isObservable,
  isObservableObject,
} from 'mobx';
import { ICommonInputProps } from '../types';
import { validateHasError } from '../utils';
import defaultRuleManager from '../validator/rules-manager';

const ignoreFields = [
  'model',
  'path',
  'value',
  'onChange',
  'beforeChange',
  'afterChange',
  'getValue',
  'transformViewToModel',
  'transformModelToView',
  'label',
  'itemProps',
  'rules',
  'noFormItem',
  'needValidate',
  'validateInfoManager',
  'inputPropsFromContext',
  'suffixTip',
  'innerRuleMsg',
  'setRuleMsg',
  'clearRuleMsg',
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

export function getFormProps<M extends Object>(
  props: ICommonInputProps<M> & {
    innerRuleMsg?: string;
  },
) {
  const transformModelToView = props.transformModelToView || identity;
  const transformViewToModel = props.transformViewToModel || identity;
  const getValue = props.getValue || get;

  const model = props.model!;
  const path = props.path!;

  function handleChange(changeValue: any) {
    const value = transformViewToModel(changeValue, props);
    const sharedParam = {
      model,
      value,
      path,
    };

    if (props.beforeChange) {
      const oldValue = getValue(model, path as any);
      const beforeCheckResult = props.beforeChange({
        ...sharedParam,
        oldValue,
      });
      if (beforeCheckResult === false) {
        return;
      }
    }

    const defaultChangeFn = () => {
      runInAction(() => set(model, path, value));
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

  // check value is observable
  if (process.env.NODE_ENV !== 'production' && model && path) {
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

  const inputProps = {
    ...props.inputPropsFromContext,
    ...omitCommonProps(props),
  };
  const itemProps = props.itemProps
    ? {
        ...props.itemProps,
      }
    : {};

  if (props.rules) {
    try {
      let help = '';
      if (props.innerRuleMsg) {
        help = props.innerRuleMsg;
        props.validateInfoManager.setValidateInfo(
          model,
          path,
          props.innerRuleMsg,
        );
      } else {
        help = defaultRuleManager.checkTheRules(props.rules, modelValue, model);
        props.validateInfoManager.setValidateInfo(model, path, help);
      }
      if (props.needValidate) {
        const checkResult = validateHasError(help);
        if (checkResult.error) {
          itemProps.help = help;
          itemProps.validateStatus = 'error';
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  return {
    ...props,
    itemProps,
    inputProps,
    value: formValue,
    onChange: handleChange,
    clear() {
      if (props.rules) {
        props.validateInfoManager.clearValidInfo(props.model, props.path);
      }
    },
  };
}
