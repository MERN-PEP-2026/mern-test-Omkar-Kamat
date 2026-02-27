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
                        background:
                            toast.type === "error" ? "#ff4d4f" : "#52c41a",
                        color: "white",
                        borderRadius: 6,
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
