import {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse
} from "../services/course.service.js";
import { updateCourse } from "../services/course.service.js";
import { enrollInCourse } from "../services/course.service.js";
import { getEnrolledStudents } from "../services/course.service.js";
import { getStudentCourses } from "../services/course.service.js";

export const create = async (req, res, next) => {
  try {
    const course = await createCourse(req.body, req.user);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await getAllCourses({ page, limit, search });

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const course = await getCourseById(req.params.id);

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const result = await deleteCourse(req.params.id);

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const course = await updateCourse(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

export const enroll = async (req, res, next) => {
  try {
    const result = await enrollInCourse(req.params.id, req.user);

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await getEnrolledStudents(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      data: students
    });
  } catch (error) {
    next(error);
  }
};

export const getMyCourses = async (req, res, next) => {
  try {
    const courses = await getStudentCourses(req.user.id);

    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    next(error);
  }
};