import { useRef, useCallback } from 'react';

export function useHookWithRefCallback<T>() {
  const ref = useRef<T>();

  const setRef = useCallback((node: T) => {
    if (ref.current) {
      // cleanup && cleanup();
      // Make sure to cleanup any events/references added to the last instance
    }

    if (node) {
      // Check if a node is actually passed. Otherwise node would be null.
      // You can now do what you need to, addEventListeners, measure, etc.
      // callback && callback(node);
    }

    // Save a reference to the node
    ref.current = node;
  }, []);

  return [setRef];
}
