import express from "express";
import {
  loginAdminOrStaff,
  currentAdmin,
  logoutAdminOrStaff,
  registerAdminAndStaff,
} from "../../controllers/admin/admin.controller.js";
import { verifyAdminOrStaffJWT } from "../../middlewares/admin.auth.middleware.js";
import {
  createCourse,
  createLecture,
  getAllCourses,
  uploadCourseImage,
} from "../../controllers/admin/course.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {
  allocateCourseToInstructor,
  getAllInstructor,
  listOfCoursesAndInstructor,
} from "../../controllers/admin/instructors.controller.js";

const router = express.Router();

router.route("/register").post(registerAdminAndStaff);
router.route("/login").post(loginAdminOrStaff);
router.route("/logout").post(verifyAdminOrStaffJWT, logoutAdminOrStaff);
router.route("/").get(verifyAdminOrStaffJWT, currentAdmin);
// course routes
router.route("/create-course").post(verifyAdminOrStaffJWT, createCourse);

router
  .route("/upload-course-image/:id")
  .post(verifyAdminOrStaffJWT, upload.single("file"), uploadCourseImage);

router
  .route("/create-class")
  .post(verifyAdminOrStaffJWT, upload.single("thumbnail"), createLecture);

router.route("/get-all-course").get(verifyAdminOrStaffJWT, getAllCourses);
router.route("/all-instructors").get(verifyAdminOrStaffJWT, getAllInstructor);

router
  .route("/course-instructor")
  .get(verifyAdminOrStaffJWT, listOfCoursesAndInstructor);
router
  .route("/assign-course")
  .patch(verifyAdminOrStaffJWT, allocateCourseToInstructor);

export default router;
