import { createContext, useContext } from 'react';

const ToastContext = createContext(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children, addToast }) {
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
    </ToastContext.Provider>
  );
}
