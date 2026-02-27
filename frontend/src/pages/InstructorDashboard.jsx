import { useEffect, useState } from "react";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function InstructorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    api.get("/courses?page=1&limit=50")
      .then(res => {
        const owned = res.data.data.filter(
          course => course.instructor?._id === user.id
        );
        setCourses(owned);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const styles = {
    wrapper: "max-w-6xl mx-auto px-6 py-12",

    heading:
      "text-3xl font-semibold text-brand-500 mb-10",

    grid:
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",

    card:
      "bg-white border border-brand-300 rounded-2xl shadow-sm p-6 flex flex-col justify-between",

    title:
      "text-lg font-semibold text-brand-500 mb-3",

    meta:
      "text-sm text-brand-400 mb-4",

    actionRow:
      "flex gap-3 mt-4",

    primaryButton:
      "px-4 py-2 rounded-xl bg-brand-200 text-white text-xs font-medium hover:bg-brand-300 transition",

    secondaryButton:
      "px-4 py-2 rounded-xl border border-brand-300 text-brand-500 text-xs font-medium hover:bg-brand-100 transition",

    empty:
      "text-brand-400 text-sm text-center py-16",

    loader:
      "flex justify-center items-center min-h-[60vh] text-brand-400"
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        Loading your courses...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        My Created Courses
      </h2>

      {courses.length === 0 ? (
        <div className={styles.empty}>
          You haven't created any courses yet.
        </div>
      ) : (
        <div className={styles.grid}>
          {courses.map(course => (
            <div key={course._id} className={styles.card}>
              <div>
                <h3 className={styles.title}>
                  {course.title}
                </h3>

                <p className={styles.meta}>
                  {course.students?.length || 0} enrolled students
                </p>
              </div>

              <div className={styles.actionRow}>
                <Link to={`/courses/${course._id}/students`}>
                  <button className={styles.secondaryButton}>
                    View Students
                  </button>
                </Link>

                <Link to={`/courses/${course._id}/edit`}>
                  <button className={styles.primaryButton}>
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InstructorDashboard;