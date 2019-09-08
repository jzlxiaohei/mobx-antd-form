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
              } = OriginComponent as any;
              const [innerRuleMsg, setInnerRuleMsg] = React.useState('');

              const defaultProps = {
                transformModelToView: transformModelToView,
                transformViewToModel: transformViewToModel,
                model: contextValue.model,
                itemProps: contextValue.itemProps,
                needValidate: contextValue.needValidate,
                validateInfoManager: contextValue.validateInfoManager,
                inputPropsFromContext: contextValue.inputProps,
                innerRuleMsg,
                setRuleMsg(msg: string) {
                  setInnerRuleMsg(msg);
                },
                clearRuleMsg() {
                  setInnerRuleMsg('');
                },
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
