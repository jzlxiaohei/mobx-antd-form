import * as React from 'react';
import { useFormProps } from './use-form-props';
import { Form } from 'antd';
import { ICommonFormOuterProps, ValidateFn } from '../types';

export default function(OriginComponent: React.ElementType) {
  function FormItemHoc<M>(rawProps: ICommonFormOuterProps<M>) {
    const {
      transformModelToView,
      transformViewToModel,
      defaultRuleFn,
    }: {
      transformModelToView: ICommonFormOuterProps<M>['transformModelToView'];
      transformViewToModel: ICommonFormOuterProps<M>['transformViewToModel'];
      defaultRuleFn: ValidateFn<M>;
    } = OriginComponent as any;
    if (rawProps.model) {
      throw new Error(`pass model in FormContext`);
    }
    const defaultProps = {
      transformModelToView: transformModelToView,
      transformViewToModel: transformViewToModel,
      defaultRuleFn,
    };

    const props = useFormProps({
      ...defaultProps,
      ...rawProps,
    });

    React.useEffect(() => {
      return () => {
        props.clear();
      };
    }, []);

    const commonProps = {
      value: props.value,
      onChange: props.onChange,
      model: props.model,
    };

    if (props.noFormItem) {
      return <OriginComponent {...props.inputProps} {...commonProps} />;
    }
    return (
      <Form.Item {...props.itemProps} label={props.label}>
        <OriginComponent {...props.inputProps} {...commonProps} />
        {props.suffixTip}
      </Form.Item>
    );
  }
  return FormItemHoc;
}
