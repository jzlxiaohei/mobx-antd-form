import * as React from 'react';
import { Form } from 'antd';
import { IFormHooksModel } from '../create-model';
import { FormContext } from '../form-context';
import { ICommonFormOuterProps } from '../types';

export default function FormWrapper<M>(
  props: Pick<
    ICommonFormOuterProps<M>,
    'label' | 'itemProps' | 'noFormItem' | 'suffixTip'
  > & {
    children: (model: IFormHooksModel<M>) => React.ReactElement;
  },
) {
  const contextValue = React.useContext(FormContext);
  const children = props.children(contextValue.model);
  if (props.noFormItem) {
    return children;
  }
  return (
    <Form.Item {...props.itemProps} label={props.label}>
      {children}
      {props.suffixTip}
    </Form.Item>
  );
}
