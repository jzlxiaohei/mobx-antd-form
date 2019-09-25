import get from 'lodash/get';
import { ICommonFormOuterProps, ValidateFn } from './types';
import { omitCommonProps } from './utils';
import defaultRuleManager from './validator/rules-manager';
import { validateHasError } from './validator/utils';
import { ValidateInfoManager } from './validator/validate-info-manager';

const identity = (e: any) => e;

export function useFormProps<M>(props: ICommonFormOuterProps<M>) {
  const model = props.model!;
  const path = props.path!;
  const getValue = props.getValue;

  const transformModelToView = props.transformModelToView || identity;
  const transformViewToModel = props.transformViewToModel || identity;

  const modelValue = getValue(model.state, path as any);
  const formValue = transformModelToView(modelValue, props);

  function handleChange(changeValue: any) {
    const value = transformViewToModel(changeValue, props);
    const sharedParam = {
      model,
      value,
      path,
    };

    if (props.beforeChange) {
      const oldValue = modelValue;
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

  const inputProps = {
    ...props.inputPropsFromContext,
    ...omitCommonProps(props),
  };
  const itemProps = props.itemProps
    ? {
        ...props.itemProps,
      }
    : {};

  if (props.needValidate) {
    let rules = [] as ValidateFn<M>[];
    if (props.defaultRuleFn) {
      rules.push(props.defaultRuleFn);
    }
    if (props.rules) {
      rules = rules.concat(props.rules);
    }

    if (rules.length) {
      try {
        let help = '';
        help = defaultRuleManager.checkTheRules(rules, modelValue, model);
        const hasError = validateHasError(help);
        const validateInfoManager: ValidateInfoManager =
          props.validateInfoManager;
        validateInfoManager.setValidateInfo(path, help);
        if (hasError) {
          itemProps.help = help;
          itemProps.validateStatus = 'error';
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  return {
    ...props,
    itemProps,
    inputProps,
    value: formValue,
    onChange: handleChange,
    clear() {
      const validateInfoManager: ValidateInfoManager =
        props.validateInfoManager;
      validateInfoManager.clearValidInfo(props.path);
    },
  };
}
