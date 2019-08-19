import { useRef } from 'react';

function useInstance<M>(
  initialValueOrFunction: () => M,
): ReturnType<typeof initialValueOrFunction> {
  const ref = useRef<M>();
  if (!ref.current) {
    ref.current = initialValueOrFunction();
  }
  return ref.current;
}

export default useInstance;
