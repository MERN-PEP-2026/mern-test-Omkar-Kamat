import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  const styles = {
    loaderWrapper:
      "flex items-center justify-center min-h-[60vh]",

    loaderBox:
      "flex flex-col items-center gap-4",

    spinner:
      "w-8 h-8 border-4 border-brand-300 border-t-brand-200 rounded-full animate-spin",

    text:
      "text-sm text-brand-400 font-medium"
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loaderBox}>
          <div className={styles.spinner}></div>
          <p className={styles.text}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;