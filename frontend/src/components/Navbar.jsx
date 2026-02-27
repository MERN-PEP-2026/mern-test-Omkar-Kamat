import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  const styles = {
    nav: "w-full border-b border-brand-300 bg-white/70 backdrop-blur-md",
    container:
      "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between",

    leftSection: "flex items-center gap-6",
    rightSection: "flex items-center gap-5",

    logo:
      "text-lg font-semibold tracking-tight text-brand-500 hover:text-brand-300 transition-colors",

    link:
      "text-sm font-medium text-brand-400 hover:text-brand-200 transition-colors",

    userBadge:
      "px-3 py-1 rounded-xl bg-brand-100 text-brand-500 text-xs font-medium border border-brand-300",

    button:
      "px-4 py-2 rounded-xl bg-brand-200 text-white text-sm font-medium hover:bg-brand-300 transition-all duration-200 shadow-sm"
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo}>
            LMS
          </Link>

          {user && user.role === "STUDENT" && (
            <Link to="/my-courses" className={styles.link}>
              My Courses
            </Link>
          )}

          {user &&
            (user.role === "INSTRUCTOR" || user.role === "ADMIN") && (
              <Link to="/create-course" className={styles.link}>
                Create Course
              </Link>
            )}
        </div>

        <div className={styles.rightSection}>
          {!user && (
            <>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
              <Link to="/register" className={styles.button}>
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <span className={styles.userBadge}>
                {user.name} ({user.role})
              </span>

              <button onClick={logout} className={styles.button}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;