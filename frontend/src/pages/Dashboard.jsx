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

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCourses();
  };

  const styles = {
    wrapper: "max-w-7xl mx-auto px-6 py-12",

    heading:
      "text-3xl font-semibold text-brand-500 mb-8",

    searchForm:
      "flex gap-3 mb-10",

    searchInput:
      "flex-1 px-4 py-2 rounded-xl border border-brand-300 text-sm text-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition",

    searchButton:
      "px-5 py-2 rounded-xl bg-brand-200 text-white text-sm font-medium hover:bg-brand-300 transition",

    grid:
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",

    card:
      "bg-white border border-brand-300 rounded-2xl shadow-sm p-6 flex flex-col justify-between",

    cardTitle:
      "text-lg font-semibold text-brand-500 mb-2",

    description:
      "text-sm text-brand-400 mb-4 line-clamp-3",

    meta:
      "text-xs text-brand-400 space-y-1",

    progressWrapper:
      "mt-3 w-full bg-brand-100 rounded-xl h-2 overflow-hidden",

    progressBar:
      "h-full bg-brand-200 transition-all duration-300",

    detailsLink:
      "mt-4 text-sm font-medium text-brand-300 hover:text-brand-200 transition",

    pagination:
      "flex justify-center items-center gap-6 mt-12",

    pageButton:
      "px-4 py-2 rounded-xl border border-brand-300 text-sm text-brand-500 hover:bg-brand-100 transition disabled:opacity-40 disabled:cursor-not-allowed",

    pageText:
      "text-sm text-brand-400"
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Dashboard</h1>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      <div className={styles.grid}>
        {courses.map(course => {
          const percent =
            (course.students.length / course.capacity) * 100;

          return (
            <div key={course._id} className={styles.card}>
              <div>
                <h3 className={styles.cardTitle}>
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
                    Seats: {course.students.length} / {course.capacity}
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
                className={styles.detailsLink}
              >
                View Details →
              </Link>
            </div>
          );
        })}
      </div>

      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className={styles.pageButton}
        >
          Prev
        </button>

        <span className={styles.pageText}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;