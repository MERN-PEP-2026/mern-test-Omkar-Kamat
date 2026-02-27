import { useEffect, useState } from "react";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function InstructorDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/courses?page=1&limit=50")
      .then(res => {
        const owned = res.data.data.filter(
          course => course.instructor?._id === user._id
        );
        setCourses(owned);
      })
      .catch(console.error);
  }, [user]);

  return (
    <div>
      <h2>My Created Courses</h2>

      {courses.map(course => (
        <div key={course._id} style={{ marginBottom: 15 }}>
          <h3>{course.title}</h3>
          <Link to={`/courses/${course._id}/students`}>
            View Enrolled Students
          </Link>
        </div>
      ))}
    </div>
  );
}

export default InstructorDashboard;