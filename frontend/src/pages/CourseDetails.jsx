import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [course, setCourse] = useState(null);

  const fetchCourse = async () => {
    const res = await api.get(`/courses/${id}`);
    setCourse(res.data.data);
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const enroll = async () => {
    await api.post(`/courses/${id}/enroll`);
    showToast("Enrolled successfully", "success");
    fetchCourse();
  };

  const deleteCourse = async () => {
    await api.delete(`/courses/${id}`);
    showToast("Course deleted", "success");
    navigate("/");
  };

  const styles = {
    wrapper: "max-w-4xl mx-auto px-6 py-12",

    card:
      "bg-white border border-brand-300 rounded-2xl shadow-sm p-8 space-y-6",

    title:
      "text-3xl font-semibold text-brand-500 tracking-tight",

    description:
      "text-brand-400 leading-relaxed",

    infoBlock:
      "flex flex-col gap-2 text-sm",

    label: "font-medium text-brand-500",

    value: "text-brand-400",

    capacityBarWrapper:
      "mt-2 w-full bg-brand-100 rounded-xl h-3 overflow-hidden",

    capacityBar:
      "h-full bg-brand-200 transition-all duration-300",

    actionRow:
      "flex gap-4 pt-4 border-t border-brand-200",

    primaryButton:
      "px-5 py-2 rounded-xl bg-brand-200 text-white text-sm font-medium hover:bg-brand-300 transition",

    secondaryButton:
      "px-5 py-2 rounded-xl border border-brand-300 text-brand-500 text-sm font-medium hover:bg-brand-100 transition",

    dangerButton:
      "px-5 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium hover:opacity-90 transition"
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-brand-400">
        Loading course...
      </div>
    );
  }

  const capacityPercent =
    (course.students.length / course.capacity) * 100;

  const isOwner =
    user?.role === "INSTRUCTOR" &&
    course.instructor?._id === user?.id;

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>{course.title}</h1>

        <p className={styles.description}>
          {course.description}
        </p>

        <div className={styles.infoBlock}>
          <span>
            <span className={styles.label}>Instructor: </span>
            <span className={styles.value}>
              {course.instructor?.name}
            </span>
          </span>

          <span>
            <span className={styles.label}>Capacity: </span>
            <span className={styles.value}>
              {course.students.length} / {course.capacity}
            </span>
          </span>

          <div className={styles.capacityBarWrapper}>
            <div
              className={styles.capacityBar}
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
        </div>

        <div className={styles.actionRow}>
          {user?.role === "STUDENT" && (
            <button
              onClick={enroll}
              className={styles.primaryButton}
            >
              Enroll
            </button>
          )}

          {(isOwner || isAdmin) && (
            <Link to={`/courses/${id}/edit`}>
              <button className={styles.secondaryButton}>
                Edit
              </button>
            </Link>
          )}

          {isAdmin && (
            <button
              onClick={deleteCourse}
              className={styles.dangerButton}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;