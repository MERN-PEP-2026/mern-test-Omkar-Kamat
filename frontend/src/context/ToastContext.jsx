import { createContext, useState, useEffect } from "react";

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    const handler = (e) => showToast(e.detail);
    window.addEventListener("api-error", handler);
    return () => window.removeEventListener("api-error", handler);
  }, []);

  const styles = {
    wrapper:
      "fixed bottom-6 right-6 z-50",

    toast:
      "min-w-[260px] px-5 py-3 rounded-2xl shadow-lg border text-sm font-medium backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4",

    success:
      "bg-brand-200 text-white border-brand-300",

    error:
      "bg-brand-500 text-white border-brand-400"
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className={styles.wrapper}>
          <div
            className={`${styles.toast} ${
              toast.type === "success"
                ? styles.success
                : styles.error
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
export { ToastContext };