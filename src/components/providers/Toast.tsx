"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ToastContext = createContext<(message: string) => void>(() => {});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4"
      >
        {toast && (
          <span
            key={toast.id}
            className="animate-[toast-in_0.5s_var(--ease-expo)] rounded-full bg-fg px-4 py-2.5 label text-bg shadow-lg"
          >
            <span className="mr-2 inline-block size-1.5 -translate-y-px rounded-full bg-accent align-middle" />
            {toast.message}
          </span>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
