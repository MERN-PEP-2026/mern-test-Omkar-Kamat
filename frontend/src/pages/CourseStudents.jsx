import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function CourseStudents() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/courses/${id}/students`)
      .then(res => setStudents(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const styles = {
    wrapper: "max-w-5xl mx-auto px-6 py-12",

    heading:
      "text-2xl font-semibold text-brand-500 mb-8",

    card:
      "bg-white border border-brand-300 rounded-2xl shadow-sm overflow-hidden",

    tableHeader:
      "grid grid-cols-3 px-6 py-4 bg-brand-100 text-brand-500 text-sm font-semibold",

    row:
      "grid grid-cols-3 px-6 py-4 text-sm border-t border-brand-200 items-center hover:bg-brand-100/50 transition-colors",

    cell: "text-brand-400",

    roleBadge:
      "inline-block px-3 py-1 rounded-xl text-xs font-medium border",

    student:
      "bg-brand-100 text-brand-500 border-brand-300",

    instructor:
      "bg-brand-200 text-white border-brand-300",

    admin:
      "bg-brand-500 text-white border-brand-400",

    empty:
      "text-center text-brand-400 py-10 text-sm",

    loader:
      "flex justify-center items-center min-h-[50vh] text-brand-400"
  };

  const getRoleStyle = (role) => {
    if (role === "ADMIN") return styles.admin;
    if (role === "INSTRUCTOR") return styles.instructor;
    return styles.student;
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        Loading students...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        Enrolled Students
      </h2>

      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
        </div>

        {students.length === 0 && (
          <div className={styles.empty}>
            No students enrolled yet.
          </div>
        )}

        {students.map(student => (
          <div key={student._id} className={styles.row}>
            <span className={styles.cell}>
              {student.name}
            </span>
            <span className={styles.cell}>
              {student.email}
            </span>
            <span>
              <span
                className={`${styles.roleBadge} ${getRoleStyle(student.role)}`}
              >
                {student.role}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseStudents;