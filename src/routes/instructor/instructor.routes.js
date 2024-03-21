import express from "express";
import {
  currentInstructor,
  instructorLogin,
  instructorLogout,
  instructorRegistration,
} from "../../controllers/instructor/instructor.controller.js";
import { instructorVerifyJWT } from "../../middlewares/instructor.auth.middleware.js";

import { listOfAllCoursesAssignedToInstructor } from "../../controllers/instructor/course.controller.js";

const router = express.Router();

router.route("/register").post(instructorRegistration);
router.route("/login").post(instructorLogin);
router.route("/logout").post(instructorVerifyJWT, instructorLogout);
router.route("/").get(instructorVerifyJWT, currentInstructor);

router
  .route("/course-list")
  .get(instructorVerifyJWT, listOfAllCoursesAssignedToInstructor);

export default router;
