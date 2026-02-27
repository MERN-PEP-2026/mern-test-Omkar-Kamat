import Course from "../models/course.model.js";

export const createCourse = async ({ title, description }, user) => {
  const course = await Course.create({
    title,
    description,
    instructor: user.id
  });

  return course;
};

export const getAllCourses = async () => {
  const courses = await Course.find()
    .populate("instructor", "name email role")
    .sort({ createdAt: -1 });

  return courses;
};

export const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId)
    .populate("instructor", "name email role");

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};

export const deleteCourse = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  await course.deleteOne();

  return { message: "Course deleted successfully" };
};