import * as React from 'react';
import { getFormProps } from './props';
import { ICommonInputProps } from '../types';
import { Form } from 'antd';
import { observer } from 'mobx-react';

export interface IOriginProps {
  value: any;
  onChange(value: any): void;
  [x: string]: any;
}

export default function(OriginComponent: React.ElementType) {
  function FormItemHoc<M extends Object>(rawProps: ICommonInputProps<M>) {
    // 组件自己可以提供默认转化函数实现，但是用户传入的优先级更高
    const defaultProps = {
      transformModelToView: (OriginComponent as any).transformModelToView,
      transformViewToModel: (OriginComponent as any).transformViewToModel,
    };

    const props = getFormProps({
      ...defaultProps,
      ...rawProps,
    });

    if (props.noFormItem) {
      return <OriginComponent {...props.inputProps} value={props.value} onChange={props.onChange} />;
    }
    return (
      <Form.Item {...props.itemProps} label={props.label}>
        <OriginComponent {...props.inputProps} value={props.value} onChange={props.onChange} />
      </Form.Item>
    );
  }
  return observer(FormItemHoc);
}
