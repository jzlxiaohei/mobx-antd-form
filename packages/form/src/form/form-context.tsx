import * as React from 'react';
import { Form } from 'antd';
import { IValidator } from '../validator';

interface IProps<M> {
  validator?: IValidator;
  model: M;
  itemProps?: any;
  // children: React.ReactElement | React.ReactElement[];
  [x: string]: any;
}

export const FormContext = React.createContext({
  model: null,
  validator: null,
  itemProps: null,
});

export default function FormWithContext<M extends Object>(props: IProps<M>) {
  const { model, validator, itemProps, ...otherProps } = props;
  return (
    <FormContext.Provider value={{ model, validator, itemProps }}>
      <Form {...otherProps} />
    </FormContext.Provider>
  );
}
