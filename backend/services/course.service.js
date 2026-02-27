import Course from "../models/course.model.js";

export const createCourse = async ({ title, description }, user) => {
  const course = await Course.create({
    title,
    description,
    instructor: user.id
  });

  return course;
};

export const getAllCourses = async ({ page = 1, limit = 10, search = "" }) => {
  const skip = (page - 1) * limit;

  const query = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const [courses, total] = await Promise.all([
    Course.find(query)
      .populate("instructor", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Course.countDocuments(query)
  ]);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: courses
  };
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

export const updateCourse = async (courseId, data, user) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  if (
    user.role === "INSTRUCTOR" &&
    course.instructor.toString() !== user.id
  ) {
    throw new Error("Not authorized to update this course");
  }

  Object.assign(course, data);
  await course.save();

  return course;
};

export const enrollInCourse = async (courseId, user) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  if (course.students.includes(user.id)) {
    throw new Error("Already enrolled in this course");
  }

  course.students.push(user.id);
  await course.save();

  return { message: "Enrolled successfully" };
}; 