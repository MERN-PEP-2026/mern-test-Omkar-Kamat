import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: 15, borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: 15 }}>Home</Link>

      {!user && (
        <>
          <Link to="/login" style={{ marginRight: 15 }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          {user.role === "STUDENT" && (
            <Link to="/my-courses" style={{ marginRight: 15 }}>
              My Courses
            </Link>
          )}

          {(user.role === "INSTRUCTOR" || user.role === "ADMIN") && (
            <Link to="/create-course" style={{ marginRight: 15 }}>
              Create Course
            </Link>
          )}

          <span style={{ marginRight: 15 }}>
            {user.name} ({user.role})
          </span>

          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;