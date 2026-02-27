import { createContext, useState } from "react";

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            padding: 12,
            background: toast.type === "error" ? "#ff4d4f" : "#52c41a",
            color: "white",
            borderRadius: 6
          }}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
export { ToastContext };