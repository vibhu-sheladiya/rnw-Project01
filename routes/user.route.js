/* ------------------------------- DEFINE AREA ------------------------------ */
const express = require("express");
const router = express.Router();
const { accessToken } = require("../middleware/auth");
const { register, login } = require("../controller/auth");
const { updateUserProfile,allUser,deleteUser } = require("../controller/user.controller");

/* ------------------------------- USER AUTH ------------------------------ */

/* -------------------------- CREATE/SIGNUP USER ----------- */
router.post("/create-user", register);

/* -------------------------- LOGIN USER ----------- */
router.post(
  "/login",
  accessToken(),
  login
);

/* --------------------------- USER UPDATE PROFILE -------------------------- */
router.put("/update",
accessToken(),
updateUserProfile)

/* ------------------------------ USER ALL LIST ----------------------------- */
router.get("/list",
accessToken(),
allUser)

/* ------------------------ USER DELETE PROFILE BY ID ----------------------- */
router.delete("/delete/:userId",
accessToken(),
deleteUser)



module.exports = router;
