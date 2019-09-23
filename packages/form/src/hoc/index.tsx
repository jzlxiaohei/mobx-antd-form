import * as React from 'react';
import { getFormProps } from './props';
import { ICommonInputProps } from '../types';
import { Form } from 'antd';
import { Observer } from 'mobx-react-lite';
import { FormContext } from '../form-context';

export default function(OriginComponent: React.ElementType) {
  function FormItemHoc<M extends Object>(rawProps: ICommonInputProps<M>) {
    return (
      <FormContext.Consumer>
        {contextValue => (
          <Observer>
            {() => {
              const {
                transformModelToView,
                transformViewToModel,
                // 组件可以通过 defaultRuleFn 去控制状态是否合法
                // 比如上传组件，正在上传中，最近的状态不是合法的，可以设置为 `请等待上传完毕`
                // (value, model) => string | any,
                defaultRuleFn,
              } = OriginComponent as any;

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
              const props = getFormProps({
                ...defaultProps,
                ...rawProps,
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
            }}
          </Observer>
        )}
      </FormContext.Consumer>
    );
  }
  return FormItemHoc;
}
