"use client";

import React, { createContext, useContext, ReactNode } from 'react';

interface GlobalState {
  nim: string | undefined;
}

interface GlobalStateContextType {
  state: GlobalState;
  setNim: (nim: string | undefined) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

interface GlobalStateProviderProps {
  children: ReactNode;
  initialNim?: string | undefined;
}

export function GlobalStateProvider({ children, initialNim }: GlobalStateProviderProps) {
  const [state, setState] = React.useState<GlobalState>({
    nim: initialNim,
  });

  const setNim = (nim: string | undefined) => {
    setState(prev => ({ ...prev, nim }));
  };

  const value: GlobalStateContextType = {
    state,
    setNim,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}
