import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
  enroll,
  getStudents,
  getMyCourses
} from "../controllers/course.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCourseSchema } from "../validators/course.schema.js";
import { updateCourseSchema } from "../validators/course.schema.js";

const router = express.Router();

router.get("/", protect, getAll);

router.get("/:id", protect, getById);

router.post(
  "/",
  protect,
  authorizeRoles("INSTRUCTOR", "ADMIN"),
  validate(createCourseSchema),
  create
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("ADMIN"),
  remove
);

router.patch(
  "/:id",
  protect,
  authorizeRoles("INSTRUCTOR", "ADMIN"),
  validate(updateCourseSchema),
  update
);

router.post(
  "/:id/enroll",
  protect,
  authorizeRoles("STUDENT"),
  enroll
);

router.get(
  "/:id/students",
  protect,
  authorizeRoles("INSTRUCTOR", "ADMIN"),
  getStudents
);

router.get(
  "/me/courses",
  protect,
  authorizeRoles("STUDENT"),
  getMyCourses
);

export default router;