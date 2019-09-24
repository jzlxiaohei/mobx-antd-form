import React from 'react';
import set from 'lodash/set';

export function createModel<M extends Record<string, any>>(
  obj: M,
): IFormHooksModel<M> {
  const [state, setState] = React.useState(obj);

  return {
    data: state,
    update(key: string, value: any) {
      set(state, key, value);
      setState({
        ...state,
      });
    },
  };
}

export type IFormHooksModel<M> = {
  data: M;
  update(key: string, value: any): void;
};
