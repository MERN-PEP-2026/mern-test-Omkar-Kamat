import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import useToast from "../hooks/useToast";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then(res => {
        setForm({
          title: res.data.data.title,
          description: res.data.data.description
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.patch(`/courses/${id}`, form);
      showToast("Course updated", "success");
      navigate("/");
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

    buttonRow:
      "flex gap-4 mt-4",

    primaryButton:
      "px-6 py-2 rounded-xl bg-brand-200 text-white text-sm font-medium hover:bg-brand-300 transition disabled:opacity-50 disabled:cursor-not-allowed",

    secondaryButton:
      "px-6 py-2 rounded-xl border border-brand-300 text-brand-500 text-sm font-medium hover:bg-brand-100 transition"
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-brand-400">
        Loading course...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Edit Course</h2>

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

          <div className={styles.buttonRow}>
            <button
              type="submit"
              disabled={submitting}
              className={styles.primaryButton}
            >
              {submitting ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className={styles.secondaryButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;