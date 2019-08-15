import * as React from 'react';
import { Form } from 'antd';

interface IProps<M> {
  model: M;
  // children: React.ReactElement | React.ReactElement[];
  [x: string]: any;
}

export const FormContext = React.createContext({
  model: null,
});

export default function FormWithContext<M extends Object>(props: IProps<M>) {
  const { model, ...otherProps } = props;
  return (
    <FormContext.Provider value={{ model: props.model }}>
      <Form {...otherProps} />
    </FormContext.Provider>
  );
}
