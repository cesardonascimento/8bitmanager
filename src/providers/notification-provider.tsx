'use client';

import React, { createContext, useContext } from 'react';
import { toast, Toaster } from 'sonner';

interface NotificationContextType {
  notifySuccess: (message: string, description?: string) => void;
  notifyError: (
    message: string,
    description?: string | Error | unknown
  ) => void;
  notifyInfo: (message: string, description?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const notifySuccess = (message: string, description?: string) => {
    toast.success(message, {
      description,
      duration: 4000,
    });
  };

  const notifyError = (
    message: string,
    description?: string | Error | unknown
  ) => {
    let errorMessage: string | undefined;

    if (description instanceof Error) {
      errorMessage = description.message;
    } else if (typeof description === 'string') {
      errorMessage = description;
    } else if (description !== undefined && description !== null) {
      errorMessage = String(description);
    }

    console.error(message, errorMessage);
    toast.error(message, {
      description: errorMessage,
      duration: 5000,
    });
  };

  const notifyInfo = (message: string, description?: string) => {
    toast.info(message, {
      description,
      duration: 4000,
    });
  };

  const value = {
    notifySuccess,
    notifyError,
    notifyInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster
        position="bottom-right"
        expand={true}
        richColors={true}
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
}
