"use client";

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { AuthService } from '@/lib/services/auth-service';

interface GlobalState {
  nim: string | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface GlobalStateContextType {
  state: GlobalState;
  setNim: (nim: string | undefined) => void;
  login: (nim: string, password: string) => Promise<void>;
  adminLogin: (nim: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  confirmToken: (nim: string, confirmToken: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

interface GlobalStateProviderProps {
  children: ReactNode;
  initialNim?: string | undefined;
}

export function GlobalStateProvider({ children, initialNim }: GlobalStateProviderProps) {
  const [state, setState] = React.useState<GlobalState>({
    nim: initialNim,
    isAuthenticated: false,
    isLoading: true,
  });

  const setNim = (nim: string | undefined) => {
    setState(prev => ({ ...prev, nim }));
  };

  const login = async (nim: string, password: string) => {
    try {
      const response = await AuthService.login(nim, password);
      setState(prev => ({ 
        ...prev, 
        nim, 
        isAuthenticated: true,
        isLoading: false 
      }));
    } catch (error) {
      throw error;
    }
  };

  const adminLogin = async (nim: string, password: string) => {
    try {
      const response = await AuthService.adminLogin(nim, password);
      setState(prev => ({ 
        ...prev, 
        nim, 
        isAuthenticated: true,
        isLoading: false 
      }));
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setState(prev => ({ 
        ...prev, 
        nim: undefined, 
        isAuthenticated: false,
        isLoading: false 
      }));
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      setState(prev => ({ 
        ...prev, 
        nim: undefined, 
        isAuthenticated: false,
        isLoading: false 
      }));
    }
  };

  const confirmToken = async (nim: string, confirmToken: string, password: string) => {
    try {
      await AuthService.confirmToken(nim, confirmToken, password);
    } catch (error) {
      throw error;
    }
  };

  const checkAuthStatus = async () => {
    try {
      const { isAuthenticated, nim } = await AuthService.checkAuthStatus();
      setState(prev => ({ 
        ...prev, 
        isAuthenticated, 
        nim: isAuthenticated ? nim : undefined,
        isLoading: false 
      }));
    } catch (error) {
      console.error('Auth status check error:', error);
      setState(prev => ({ 
        ...prev, 
        isAuthenticated: false, 
        nim: undefined,
        isLoading: false 
      }));
    }
  };

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: GlobalStateContextType = {
    state,
    setNim,
    login,
    adminLogin,
    logout,
    confirmToken,
    checkAuthStatus,
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
