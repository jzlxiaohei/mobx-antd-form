import * as React from 'react';
import { Validator } from '../validator';

interface IContextProps<M> {
  validator?: Validator<M>;
  model: M;
  itemProps?: any;
  needValidate?: boolean;
  // children: React.ReactElement | React.ReactElement[];
  [x: string]: any;
}

interface IProps<M> extends IContextProps<M> {
  validateAtFirst?: boolean;
}

export const FormContext = React.createContext<IContextProps<any>>({
  model: null,
  validator: null,
  needValidate: false,
  itemProps: null,
});

export default function FormWithContext<M extends Object>(props: IProps<M>) {
  const { model, validator, itemProps, validateAtFirst, ...otherProps } = props;
  const [needValidate, setNeedValidate] = React.useState(validateAtFirst);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!needValidate) {
      setNeedValidate(true);
    }
    let isValid = validator ? validator.isValid() : true;

    if (otherProps.onSubmit && isValid) {
      otherProps.onSubmit(e);
    }
  }
  return (
    <FormContext.Provider value={{ model, validator, itemProps, needValidate }}>
      <form {...otherProps} onSubmit={e => handleSubmit(e)} />
    </FormContext.Provider>
  );
}
