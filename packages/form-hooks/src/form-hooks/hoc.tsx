import * as React from 'react';
import { useFormProps } from './use-form-props';
import { Form } from 'antd';
import { FormContext } from './form-context';
import { ICommonFormOuterProps } from './types';
import get from 'lodash/get';

export default function(OriginComponent: React.ElementType) {
  function FormItemHoc<M>(rawProps: ICommonFormOuterProps<M>) {
    const contextValue = React.useContext(FormContext);

    const {
      transformModelToView,
      transformViewToModel,
      defaultRuleFn,
    } = OriginComponent as any;
    if (contextValue.model && rawProps.model) {
      console.warn(
        `context and props both have model.
        You'd better to make sure path is unique in FormContext. Otherwise rule manager might be broken`,
      );
    }
    const defaultProps = {
      transformModelToView: transformModelToView,
      transformViewToModel: transformViewToModel,
      model: contextValue.model,
      itemProps: contextValue.itemProps,
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
        />
      );
    }
    return (
      <Form.Item {...props.itemProps} label={props.label}>
        <OriginComponent
          {...props.inputProps}
          value={props.value}
          onChange={props.onChange}
        />
        {props.suffixTip}
      </Form.Item>
    );
  }
  return FormItemHoc;
}
