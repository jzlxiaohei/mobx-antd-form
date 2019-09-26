import get from 'lodash/get';
import { ICommonFormOuterProps, ValidateFn } from '../types';
import { omitCommonProps } from '../utils';
import defaultRuleManager from '../validator/rules-manager';
import { validateHasError } from '../validator/utils';
import { ValidateInfoManager } from '../validator/validate-info-manager';
import * as React from 'react';
import { FormContext } from '../form-context';

const identity = (e: any) => e;

export function useFormProps<M>(
  _props: ICommonFormOuterProps<M> & {
    defaultRuleFn?: ValidateFn<M>;
  },
) {
  const contextValue = React.useContext(FormContext);

  const props = {
    model: contextValue.model,
    itemProps: contextValue.itemProps,
    onContextChange: contextValue.onContextChange,
    needValidate: contextValue.needValidate,
    validateInfoManager: contextValue.validateInfoManager,
    inputPropsFromContext: contextValue.inputProps,
    ..._props,
  };

  const result = React.useMemo(() => {
    const model = props.model;
    const path = props.path!;
    const getValue = props.getValue || get;
    const modelValue = getValue(model.state, path as any);
    const transformModelToView = props.transformModelToView || identity;
    const transformViewToModel = props.transformViewToModel || identity;
    const formValue = transformModelToView(modelValue, props);
    function handleChange(changeValue: any) {
      const value = transformViewToModel(changeValue, props);
      const sharedParam = {
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

      const newState = model.setKey(path, value);

      if (props.onChange) {
        props.onChange({
          ...sharedParam,
          state: newState,
        });
      }

      if (props.onContextChange) {
        props.onContextChange({ state: newState });
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
        const validateInfoManager: ValidateInfoManager =
          props.validateInfoManager;
        validateInfoManager.setValidateInfo(path, help);
        if (props.needValidate) {
          const hasError = validateHasError(help);
          if (hasError) {
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
      model: model,
      // children: props.children,
      clear() {
        const validateInfoManager: ValidateInfoManager =
          props.validateInfoManager;
        validateInfoManager.clearValidInfo(props.path);
      },
    };
  }, [props.model, props.path, props.getValue]);

  return result;
}
