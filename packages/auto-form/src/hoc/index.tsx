import * as React from 'react';
import { useFormProps } from './use-form-props';
import { Form } from 'antd';
import { FormContext } from '../form-context';
import { ICommonFormOuterProps } from '../types';
import get from 'lodash/get';

export default function(OriginComponent: React.ElementType) {
  function FormItemHoc<M>(rawProps: ICommonFormOuterProps<M>) {
    const contextValue = React.useContext(FormContext);

    const {
      transformModelToView,
      transformViewToModel,
      defaultRuleFn,
    } = OriginComponent as any;
    if (rawProps.model) {
      throw new Error(`pass model in FormContext`);
    }
    const defaultProps = {
      transformModelToView: transformModelToView,
      transformViewToModel: transformViewToModel,
      model: contextValue.model,
      itemProps: contextValue.itemProps,
      onContextChange: contextValue.onContextChange,
      needValidate: contextValue.needValidate,
      validateInfoManager: contextValue.validateInfoManager,
      inputPropsFromContext: contextValue.inputProps,
      defaultRuleFn,
    };
    const getValue = rawProps.getValue || get;

    // const value = getValue(rawProps.model.data, rawProps.path);
    // React.useMemo to avoid render
    const props = useFormProps({
      ...defaultProps,
      ...rawProps,
      getValue,
    });

    React.useEffect(() => {
      return () => {
        props.clear();
      };
    }, []);

    if (props.noFormItem) {
      return (
        <OriginComponent
          {...props.inputProps}
          value={props.value}
          onChange={props.onChange}
          children={props.children}
        />
      );
    }
    return (
      <Form.Item {...props.itemProps} label={props.label}>
        <OriginComponent
          {...props.inputProps}
          value={props.value}
          onChange={props.onChange}
          model={props.model}
          children={props.children}
        />
        {props.suffixTip}
      </Form.Item>
    );
  }
  return FormItemHoc;
}
