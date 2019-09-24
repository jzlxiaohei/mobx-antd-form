import * as React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { Observer } from 'mobx-react-lite';
import { FormContext } from '../form-context';

export default function FormButton(props: ButtonProps) {
  return (
    <FormContext.Consumer>
      {contextValue => (
        <Observer>
          {() => {
            let buttonDisabled = false;
            if (contextValue.needValidate) {
              buttonDisabled = !contextValue.validateInfoManager!.isValid;
            }
            return <Button disabled={buttonDisabled} htmlType="submit" {...props} />;
          }}
        </Observer>
      )}
    </FormContext.Consumer>
  );
}
