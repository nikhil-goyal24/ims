const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  createChoiceList,
  getAllChoiceLists,
  getChoiceListById,
  updateChoiceList,
  deleteChoiceList,
} = require("../Controller/ChoiceFillingController");

// Create a new choice list
router.post("/createChoiceList", isAuthenticatedUser, createChoiceList);

// Get all choice lists
router.get("/getAllChoiceLists", isAuthenticatedUser, getAllChoiceLists);

// Get choice list by ID
router.get("/getChoiceListById/:id", isAuthenticatedUser, getChoiceListById);

// Update choice list by ID
router.put("/updateChoiceList/:id", isAuthenticatedUser, updateChoiceList);

// Delete choice list by ID
router.delete("/deleteChoiceList/:id", isAuthenticatedUser, deleteChoiceList);

module.exports = router;
