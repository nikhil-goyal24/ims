const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  register,
  adminRegister,
  login,
  adminLogin,
  logout,
  adminLogout,
  forgotPassword,
  resetPassword,
  getallUser,
  getaUser,
  getUserById,
  deleteaUser,
  updatedUser,
  updatePassword,
  uploadImage,
  verifyUser,
  verifyAdmin,
  addToWishlist,
  deleteAllWishlistItems,
  removeFromWishlist,
  generateOtp,
  verifyOtp
} = require("../Controller/auth");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/login").post(login);

router.route("/adminLogin").post(adminLogin);

router.route("/logout").get(isAuthenticatedUser, logout);

router.route("/adminLogout").get(isAuthenticatedUser, adminLogout);

router.route("/verifyUserToken/:token").get(verifyUser);

router.route("/verifyAdminToken/:token").get(verifyAdmin);

router.route("/generate-otp").post(generateOtp);

router.route("/verify-otp").post(verifyOtp);

// Create User
router.route("/register").post(register);

router.route("/adminRegister").post(adminRegister);

// Update User Password
router.post("/updatePassword", isAuthenticatedUser, updatePassword);

// Update User
router.put("/edit-user/:id",isAuthenticatedUser, updatedUser);

// Get all Users
router.get("/all-users", isAuthenticatedUser, authorizeRoles("admin"), getallUser);

// Get a User
router.route("/getaUser").get(isAuthenticatedUser, getaUser);

// Get user by ID 
router.route("/getUserById/:id").get(isAuthenticatedUser, getUserById);

// Delete a user
router.delete("/deleteaUser/:id",isAuthenticatedUser, authorizeRoles("admin"), deleteaUser);

router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);

router.route("/addToWishlist").post(isAuthenticatedUser , addToWishlist);

router.route("/deleteAllWishlistItems").delete(isAuthenticatedUser , deleteAllWishlistItems);

router.route("/removeFromWishlist/:collegeId").delete(isAuthenticatedUser , removeFromWishlist);

router.route("/uploadImage").post(isAuthenticatedUser, authorizeRoles("admin"), upload.single('file'),uploadImage)

module.exports = router;