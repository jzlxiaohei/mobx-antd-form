import * as React from 'react';
import { ValidateInfoManager } from './validator/validate-info-manager';
import { IFormHooksModel } from './create-model';

export interface IContextProps<M> {
  model?: IFormHooksModel<M>;
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
  inputProps: null,
});

export default function FormWithContext<M extends Object>(
  props: IProps<M> &
    React.DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
) {
  const {
    model,
    itemProps,
    validateAtFirst,
    inputProps,
    ...otherProps
  } = props;
  const [needValidate, setNeedValidate] = React.useState(validateAtFirst);
  const [isValid, setIsValid] = React.useState(true);

  const ref = React.useRef<ValidateInfoManager>();
  if (!ref.current) {
    ref.current = new ValidateInfoManager();
    ref.current.onValidChange(valid => {
      console.log(valid);
      setIsValid(valid);
    });
  }
  const validateInfoManager = ref.current;

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!needValidate) {
        setNeedValidate(true);
      }

      if (otherProps.onSubmit && isValid) {
        otherProps.onSubmit(e);
      }
    },
    [needValidate, isValid],
  );

  return (
    <FormContext.Provider
      value={{
        model,
        itemProps,
        inputProps,
        needValidate,
        validateInfoManager,
      }}
    >
      <form {...otherProps} onSubmit={e => handleSubmit(e)} />
    </FormContext.Provider>
  );
}
