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
  };

  const deleteCourse = async () => {
    await api.delete(`/courses/${id}`);
    showToast("Course deleted", "success");
    navigate("/");
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>
        Instructor: {course.instructor?.name}
      </p>
      <p>
        Capacity: {course.students.length} / {course.capacity}
      </p>

      {user?.role === "STUDENT" && (
        <button onClick={enroll}>
          Enroll
        </button>
      )}

      {(user?.role === "INSTRUCTOR" &&
        course.instructor?._id === user._id) ||
      user?.role === "ADMIN" ? (
        <>
          <Link to={`/courses/${id}/edit`}>
            <button>Edit</button>
          </Link>

          {user.role === "ADMIN" && (
            <button onClick={deleteCourse}>
              Delete
            </button>
          )}
        </>
      ) : null}
    </div>
  );
}

export default CourseDetails;