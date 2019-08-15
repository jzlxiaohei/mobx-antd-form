import * as React from 'react';
import { getFormProps } from './props';
import { ICommonInputProps } from '../../types';
import { Form } from 'antd';
import { Observer } from 'mobx-react';
import { FormContext } from '../../form/form-context';

export interface IOriginProps {
  value: any;
  onChange(value: any): void;
  [x: string]: any;
}

export default function(OriginComponent: React.ElementType) {
  function FormItemHoc<M extends Object>(rawProps: ICommonInputProps<M>) {
    return (
      <FormContext.Consumer>
        {contextValue => (
          <Observer>
            {() => {
              // 组件自己可以提供默认转化函数实现，但是用户传入的优先级更高
              const {
                transformModelToView,
                transformViewToModel,
              } = OriginComponent as any;

              const defaultProps = {
                transformModelToView: transformModelToView,
                transformViewToModel: transformViewToModel,
                model: contextValue.model,
                validator: contextValue.validator,
                itemProps: contextValue.itemProps,
              };
              const props = getFormProps({
                ...defaultProps,
                ...rawProps,
              });

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
                </Form.Item>
              );
            }}
          </Observer>
        )}
      </FormContext.Consumer>
    );
  }
  return FormItemHoc;
}
