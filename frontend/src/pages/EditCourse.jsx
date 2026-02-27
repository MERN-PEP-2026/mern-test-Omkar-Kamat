import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import useToast from "../hooks/useToast";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then(res => {
        setForm({
          title: res.data.data.title,
          description: res.data.data.description
        });
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.patch(`/courses/${id}`, form);
    showToast("Course updated", "success");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Course</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditCourse;