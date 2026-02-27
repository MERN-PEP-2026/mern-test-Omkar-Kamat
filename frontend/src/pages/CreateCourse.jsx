import { useState } from "react";
import api from "../api/axios";
import useToast from "../hooks/useToast";

function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    capacity: 1
  });

  const {showToast} = useToast();

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "capacity"
          ? Number(e.target.value)
          : e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/courses", form);
    showToast("Course created", "success");
  };

  return (
    <div>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="capacity"
          type="number"
          min="1"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateCourse;