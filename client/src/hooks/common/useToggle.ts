
import * as React from 'react'

export const useToggle = (initialState: boolean = false) => {
  // Part 2
  const [state, setState] = React.useState(initialState);

  // Part 3
  const toggle = React.useCallback(() => setState((state) => !state), []);

  // Part 4
  return [state, toggle] as const;
};