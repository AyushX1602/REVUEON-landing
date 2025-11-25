import { createContext, useContext, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ 
  children, 
  addToast 
}: { 
  children: ReactNode; 
  addToast: (message: string, type: ToastType) => void;
}) {
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
    </ToastContext.Provider>
  );
}
