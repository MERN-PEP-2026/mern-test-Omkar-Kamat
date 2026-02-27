import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import useToast from "../hooks/useToast";

function MyCourses() {
  const { showToast } = useToast();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const res = await api.get("/courses/me/courses");
      setCourses(res.data.data);
    } catch {
      showToast("Failed to fetch enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const styles = {
    wrapper: "max-w-7xl mx-auto px-6 py-12",

    heading:
      "text-3xl font-semibold text-brand-500 mb-10",

    grid:
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",

    card:
      "bg-white border border-brand-300 rounded-2xl shadow-sm p-6 flex flex-col justify-between",

    title:
      "text-lg font-semibold text-brand-500 mb-2",

    description:
      "text-sm text-brand-400 mb-4 line-clamp-3",

    meta:
      "text-xs text-brand-400 space-y-1",

    progressWrapper:
      "mt-3 w-full bg-brand-100 rounded-xl h-2 overflow-hidden",

    progressBar:
      "h-full bg-brand-200 transition-all duration-300",

    link:
      "mt-4 text-sm font-medium text-brand-300 hover:text-brand-200 transition",

    empty:
      "text-brand-400 text-sm text-center py-20",

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
      <h1 className={styles.heading}>
        My Enrolled Courses
      </h1>

      {courses.length === 0 ? (
        <div className={styles.empty}>
          You are not enrolled in any courses yet.
        </div>
      ) : (
        <div className={styles.grid}>
          {courses.map(course => {
            const percent =
              ((course.students?.length || 0) /
                course.capacity) * 100;

            return (
              <div key={course._id} className={styles.card}>
                <div>
                  <h3 className={styles.title}>
                    {course.title}
                  </h3>

                  <p className={styles.description}>
                    {course.description}
                  </p>

                  <div className={styles.meta}>
                    <p>
                      Instructor: {course.instructor?.name}
                    </p>
                    <p>
                      Seats Filled: {course.students?.length || 0} / {course.capacity}
                    </p>
                  </div>

                  <div className={styles.progressWrapper}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <Link
                  to={`/courses/${course._id}`}
                  className={styles.link}
                >
                  View Course →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyCourses;