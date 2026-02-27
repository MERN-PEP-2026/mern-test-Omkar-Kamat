import { useState } from "react";
import api from "../api/axios";
import useToast from "../hooks/useToast";

function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    capacity: 1
  });

  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "capacity"
          ? Number(e.target.value)
          : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/courses", form);
      showToast("Course created", "success");

      setForm({
        title: "",
        description: "",
        capacity: 1
      });
    } finally {
      setSubmitting(false);
    }
  };

  const styles = {
    wrapper: "max-w-3xl mx-auto px-6 py-12",

    card:
      "bg-white border border-brand-300 rounded-2xl shadow-sm p-8",

    heading:
      "text-2xl font-semibold text-brand-500 mb-8",

    form:
      "flex flex-col gap-6",

    label:
      "text-sm font-medium text-brand-500 mb-2",

    input:
      "w-full px-4 py-2 rounded-xl border border-brand-300 bg-white text-brand-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 transition",

    textarea:
      "w-full px-4 py-3 rounded-xl border border-brand-300 bg-white text-brand-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 transition resize-none",

    button:
      "mt-4 px-6 py-2 rounded-xl bg-brand-200 text-white text-sm font-medium hover:bg-brand-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Create Course</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>
              Course Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div>
            <label className={styles.label}>
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              className={styles.textarea}
            />
          </div>

          <div>
            <label className={styles.label}>
              Capacity
            </label>
            <input
              name="capacity"
              type="number"
              min="1"
              value={form.capacity}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={styles.button}
          >
            {submitting ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;