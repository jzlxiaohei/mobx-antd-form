import produce, { Draft } from 'immer';
import set from 'lodash/set';
import { useState } from 'react';

export function createModel<M extends Record<string, any>>(
  obj: M,
): IFormHooksModel<M> {
  const [state, updateState] = useState(obj);

  return {
    state,
    setKey(key: string, value: any): M {
      const nextState = produce(state, draft => {
        set(draft, key, value);
      });
      updateState(nextState);
      return nextState;
    },
    update(updateFn: (draft: Draft<M>) => void): M {
      const newState = produce(state, draft => updateFn(draft));
      updateState(newState);
      return newState;
    },
  };
}

// export function addComputed<S, R extends Record<string, (s: S) => any>>(
//   state: S,
//   computed: R,
// ) {
//   const computedResult: Record<string, any> = {};
//   React.useEffect(() => {
//     for (const [key, computeFn] of Object.entries(computed)) {
//       computedResult[key] = computeFn.call(state);
//     }
//   }, [state]);
//   return computedResult;
// }

export type IFormHooksModel<M> = {
  state: M;
  // setState(newState: M): M;
  setKey(key: string, value: any): M;
  update(updateFn: (draft: Draft<M>) => void): M;
  // assign(newState: Partial<M>): void;
};
