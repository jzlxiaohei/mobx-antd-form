import * as React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { Observer } from 'mobx-react';
import { FormContext } from '../form-context';

export default function FormButton(props: ButtonProps) {
  return (
    <FormContext.Consumer>
      {contextValue => (
        <Observer>
          {() => {
            return (
              <Button
                disabled={!contextValue.validateInfoManager.isValid()}
                htmlType="submit"
                {...props}
              />
            );
          }}
        </Observer>
      )}
    </FormContext.Consumer>
  );
}
