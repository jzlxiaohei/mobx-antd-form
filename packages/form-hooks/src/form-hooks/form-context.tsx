import * as React from 'react';
import { ValidateInfoManager } from './validator/validate-info-manager';
import { IFormHooksModel, createModel } from './create-model';

export interface IContextProps<M> {
  model?: IFormHooksModel<M>;
  itemProps?: any;
  inputProps?: any;
  needValidate?: boolean;
  validateInfoManager?: ValidateInfoManager;
  onContextChange?({ state }: { state: M }): void;
  // [x: string]: any;
}

type IProps<M> = Omit<IContextProps<M>, 'model'> & {
  initState?: M;
  state?: M;
  validateAtFirst?: boolean;
  onSubmit({ state }: { state: M }, e: React.FormEvent<HTMLFormElement>): void;
};

export const FormContext = React.createContext<IContextProps<any>>({
  model: null,
  onContextChange: undefined,
  needValidate: false,
  itemProps: null,
  validateInfoManager: undefined,
  inputProps: null,
});

export default function FormWithContext<M extends Object>(
  props: Omit<
    React.DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
    'onSubmit'
  > &
    IProps<M>,
) {
  const {
    initState,
    state,
    itemProps,
    validateAtFirst,
    inputProps,
    onContextChange,
    ...otherProps
  } = props;
  const [needValidate, setNeedValidate] = React.useState(validateAtFirst);

  const model = createModel(state || initState);

  const ref = React.useRef<ValidateInfoManager>();
  if (!ref.current) {
    ref.current = new ValidateInfoManager();
  }
  const validateInfoManager = ref.current;

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!needValidate) {
        setNeedValidate(true);
      }

      if (otherProps.onSubmit && validateInfoManager.isValid) {
        otherProps.onSubmit({ state: model.state }, e);
      }
    },
    [model, needValidate],
  );

  return (
    <FormContext.Provider
      value={{
        model,
        itemProps,
        inputProps,
        needValidate,
        validateInfoManager,
        onContextChange,
      }}
    >
      <form {...otherProps} onSubmit={e => handleSubmit(e)} />
    </FormContext.Provider>
  );
}
