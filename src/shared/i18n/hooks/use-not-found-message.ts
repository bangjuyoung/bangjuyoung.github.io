'use client';

import { NotFoundMessageProps } from '../types';
import { useEffect, useReducer } from 'react';
import { detectClientLocale, loadNotFoundMessage } from '../lib';
import { routing } from '../config';

type State = {
  status: 'idle' | 'loading' | 'success' | 'error';
  locale: string;
  message: NotFoundMessageProps | null;
  error: Error | null;
};

type Action =
  | { type: 'IDLE'; locale: string }
  | { type: 'LOADING'; locale: string }
  | { type: 'SUCCESS'; message: NotFoundMessageProps }
  | { type: 'ERROR'; error: Error };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'IDLE':
      return { status: 'idle', locale: action.locale, message: null, error: null };
    case 'LOADING':
      return { ...state, status: 'loading', locale: action.locale, message: null, error: null };
    case 'SUCCESS':
      return { ...state, status: 'success', message: action.message, error: null };
    case 'ERROR':
      return { ...state, status: 'error', message: null, error: action.error };
  }
}

export function useNotFoundMessage(
  initStatus: State['status'] = 'idle',
  initLocale: State['locale'] = routing.defaultLocale,
) {
  const [state, dispatch] = useReducer(reducer, {
    status: initStatus,
    locale: initLocale,
    message: null,
    error: null,
  });

  useEffect(() => {
    const detectedLocale = detectClientLocale();
    dispatch({ type: 'LOADING', locale: detectedLocale });

    loadNotFoundMessage(detectedLocale)
      .then((message) => {
        dispatch({ type: 'SUCCESS', message });
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error: error instanceof Error ? error : new Error('UNKNOWN_ERROR') });
      });
  }, []);

  return state;
}
