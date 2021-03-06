import * as React from 'react';
import { ValidateInfoManager } from './validator/ValidateInfoManager';

export interface IContextProps<M> {
  model?: M;
  itemProps?: any;
  inputProps?: any;
  needValidate?: boolean;
  validateInfoManager?: ValidateInfoManager;
  [x: string]: any;
}

interface IProps<M> extends IContextProps<M> {
  validateAtFirst?: boolean;
}

export const FormContext = React.createContext<IContextProps<any>>({
  model: null,
  needValidate: false,
  itemProps: null,
  validateInfoManager: undefined,
  inputProps: null
});

export default function FormWithContext<M extends Object>(
  props: IProps<M> &
    React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
) {
  const { model, itemProps, validateAtFirst, inputProps, ...otherProps } = props;
  const [needValidate, setNeedValidate] = React.useState(validateAtFirst);

  const ref = React.useRef<ValidateInfoManager>();
  if (!ref.current) {
    ref.current = new ValidateInfoManager();
  }
  const validateInfoManager = ref.current;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!needValidate) {
      setNeedValidate(true);
    }

    let isValid = validateInfoManager.isValid;

    if (otherProps.onSubmit && isValid) {
      otherProps.onSubmit(e);
    }
  }

  return (
    <FormContext.Provider
      value={{ model, itemProps, inputProps, needValidate, validateInfoManager }}
    >
      <form {...otherProps} onSubmit={e => handleSubmit(e)} />
    </FormContext.Provider>
  );
}
