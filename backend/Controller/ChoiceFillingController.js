const ChoiceList = require("../Model/ChoiceFillingModel");

// Create a new choice list
exports.createChoiceList = async (req, res, next) => {
  try {
    const newChoiceList = await ChoiceList.create(req.body);
    res.status(201).json(newChoiceList);
  } catch (error) {
    next(error);
  }
};

// Get all choice lists 
exports.getAllChoiceLists = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalCount = await ChoiceList.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const choiceLists = await ChoiceList.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "studentId",
      })
      .populate({
        path: "collegeIds",
      });

    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalChoiceLists: totalCount,
      choiceListsPerPage: choiceLists.length,
    };

    res.status(200).json({ choiceLists, pagination });
  } catch (error) {
    next(error);
  }
};

// Get choice list by ID
exports.getChoiceListById = async (req, res, next) => {
  try {
    const choiceList = await ChoiceList.findById(req.params.id)
      .populate({
        path: "studentId",
      })
      .populate({
        path: "collegeIds",
      });

    if (!choiceList) {
      return res.status(404).json({ message: "Choice list not found" });
    }

    res.status(200).json(choiceList);
  } catch (error) {
    next(error);
  }
};

// Update choice list by ID
exports.updateChoiceList = async (req, res, next) => {
  try {
    const updatedChoiceList = await ChoiceList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedChoiceList) {
      return res.status(404).json({ message: "Choice list not found" });
    }

    res.status(200).json(updatedChoiceList);
  } catch (error) {
    next(error);
  }
};

// Delete choice list by ID
exports.deleteChoiceList = async (req, res, next) => {
  try {
    const deletedChoiceList = await ChoiceList.findByIdAndDelete(
      req.params.id
    );

    if (!deletedChoiceList) {
      return res.status(404).json({ message: "Choice list not found" });
    }

    res.status(200).json({ message: "Choice list deleted successfully" });
  } catch (error) {
    next(error);
  }
};
