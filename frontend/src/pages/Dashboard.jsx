import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";

function Dashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await api.get(
        `/courses?page=${page}&limit=6&search=${search}`
      );

      setCourses(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch {
      showToast("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const handleSearch = e => {
    e.preventDefault();
    setPage(1);
    fetchCourses();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <form onSubmit={handleSearch}>
        <input
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ marginTop: 20 }}>
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
              Seats: {course.students.length} / {course.capacity}
            </p>

            <Link to={`/courses/${course._id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;