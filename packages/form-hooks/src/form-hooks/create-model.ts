import React from 'react';
import set from 'lodash/set';

export function createModel<M extends Record<string, any>>(
  obj: M,
): IFormHooksModel<M> {
  const [state, setState] = React.useState(obj);

  return {
    state,
    update(key: string, value: any) {
      set(state, key, value);

      setState({
        ...state,
      });
    },
    assign(newState: Partial<M>) {
      const s = Object.assign({}, state, newState);
      setState(s);
    },
  };
}

export function addComputed<S, R extends Record<string, (s: S) => any>>(
  state: S,
  computed: R,
) {
  const computedResult: Record<string, any> = {};
  React.useEffect(() => {
    for (const [key, computeFn] of Object.entries(computed)) {
      computedResult[key] = computeFn.call(state);
    }
  }, [state]);
  return computedResult;
}

export type IFormHooksModel<M> = {
  state: M;
  update(key: string, value: any): void;
  assign(newState: Partial<M>): void;
};
