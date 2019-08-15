import * as React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { Observer } from 'mobx-react';
import { FormContext } from '../form/form-context';
import { isValid } from '../validator';

export default function FormButton(props: ButtonProps) {
  return (
    <FormContext.Consumer>
      {contextValue => (
        <Observer>
          {() => {
            const validator = contextValue.validator;
            return <Button disabled={!isValid(validator)} {...props} />;
          }}
        </Observer>
      )}
    </FormContext.Consumer>
  );
}
