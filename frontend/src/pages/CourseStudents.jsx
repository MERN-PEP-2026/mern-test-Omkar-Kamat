import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function CourseStudents() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get(`/courses/${id}/students`)
      .then(res => setStudents(res.data.data))
      .catch(console.error);
  }, [id]);

  return (
    <div>
      <h2>Enrolled Students</h2>

      {students.map(student => (
        <div key={student._id}>
          <p>{student.name} ({student.email})</p>
        </div>
      ))}
    </div>
  );
}

export default CourseStudents;