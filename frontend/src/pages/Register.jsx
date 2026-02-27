import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT"
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await register(form);
      navigate("/");
    } finally {
      setSubmitting(false);
    }
  };

  const styles = {
    wrapper:
      "min-h-screen flex items-center justify-center px-6",

    card:
      "w-full max-w-md bg-white border border-brand-300 rounded-2xl shadow-sm p-8",

    heading:
      "text-2xl font-semibold text-brand-500 mb-8 text-center",

    form:
      "flex flex-col gap-6",

    label:
      "text-sm font-medium text-brand-500 mb-2",

    input:
      "w-full px-4 py-2 rounded-xl border border-brand-300 text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition",

    select:
      "w-full px-4 py-2 rounded-xl border border-brand-300 text-sm text-brand-500 bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 transition",

    button:
      "mt-4 px-6 py-2 rounded-xl bg-brand-200 text-white text-sm font-medium hover:bg-brand-300 transition disabled:opacity-50 disabled:cursor-not-allowed",

    footer:
      "mt-6 text-sm text-center text-brand-400",

    link:
      "text-brand-300 hover:text-brand-200 font-medium transition"
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.heading}>
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={styles.button}
          >
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;