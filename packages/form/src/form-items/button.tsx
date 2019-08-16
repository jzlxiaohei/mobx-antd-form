import * as React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { Observer } from 'mobx-react';
import { FormContext } from '../form/form-context';

export default function FormButton(props: ButtonProps) {
  return (
    <FormContext.Consumer>
      {contextValue => (
        <Observer>
          {() => {
            const validator = contextValue.validator;
            return <Button disabled={!validator.isValid()} {...props} />;
          }}
        </Observer>
      )}
    </FormContext.Consumer>
  );
}
