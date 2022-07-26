import { Dispatch, Reducer, ReducerState, useReducer } from "react";

export const usePatcher = function <T, A = Partial<T>>(
  initial: T
): [ReducerState<Reducer<T, Partial<T>>>, Dispatch<A>] {
  return useReducer<Reducer<T, A>>((p: T, a: A) => ({ ...p, ...a }), initial);
};
