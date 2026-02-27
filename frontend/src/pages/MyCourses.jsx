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

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>My Enrolled Courses</h1>

      {courses.length === 0 && (
        <p>You are not enrolled in any courses yet.</p>
      )}

      {courses.map(course => (
        <div
          key={course._id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15
          }}
        >
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>
            Instructor: {course.instructor?.name}
          </p>
          <p>
            Seats Filled: {course.students?.length || 0} / {course.capacity}
          </p>

          <Link to={`/courses/${course._id}`}>
            View Course
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MyCourses;