import React, { useReducer } from 'react';
import { IError } from 'services/types';

const defaultInitialState = { status: 'idle', data: null, error: null };

interface IState<T> {
  status: 'idle' | 'pending' | 'rejected' | 'resolved';
  data: null | T;
  error: null | IError;
}

function useAsync<T>(initialState?: IState<T>) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...(initialState ?? {}),
  });
  const [{ status, data, error }, setState] = useReducer(
    (state: IState<T>, action: any) => ({ ...state, ...action }),
    initialStateRef.current,
  );

  const run = React.useCallback(
    (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        console.warn(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        );
      }
      setState({ status: 'pending' });
      return promise.then(
        data => {
          setState({ data, status: 'resolved' });
          return data;
        },
        error => {
          setState({ status: 'rejected', error });
          return error;
        },
      );
    },
    [setState],
  );

  const setData = React.useCallback(
    (data: T) => setState({ data }),
    [setState],
  );
  const setError = React.useCallback(
    (error: IError) => setState({ error }),
    [setState],
  );
  const reset = React.useCallback(
    () => setState(initialStateRef.current),
    [setState],
  );

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

export { useAsync };
