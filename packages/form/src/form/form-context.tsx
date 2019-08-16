import * as React from 'react';
import { Validator } from '../validator';

interface IProps<M> {
  validator?: Validator<M>;
  model: M;
  itemProps?: any;
  // children: React.ReactElement | React.ReactElement[];
  [x: string]: any;
}

export const FormContext = React.createContext<IProps<any>>({
  model: null,
  validator: null,
  itemProps: null,
});

export default function FormWithContext<M extends Object>(props: IProps<M>) {
  const { model, validator, itemProps, ...otherProps } = props;
  return (
    <FormContext.Provider value={{ model, validator, itemProps }}>
      <form {...otherProps} />
    </FormContext.Provider>
  );
}
