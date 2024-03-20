const User = require("../Model/User");
const Admin = require("../Model/AdminModel");
const OTP = require("../Model/OtpModel")
const sendEmail = require("../Utils/SendEmail");
const validateMongoDbId = require("../Utils/validateMongodbId");
const { generateToken , verifyToken} = require("../config/jwtToken");
const sendToken = require("../Utils/jwtToken");
const jwt = require("jsonwebtoken");
const uploadOnS3 = require("../Utils/uploadImage");

exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Invalid request" });
    }

    let fileName = req.file.originalname;

    let url = await uploadOnS3(req.file.buffer, fileName);
    console.log("URL:::=>", url);
    return res.status(200).json({ status: true, url: url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(203).json({ error: "User with this email already exists." });
  }

  const userData = {
    email,
    // provider_ID: req.body.provider_ID,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobile: req.body.mobile,
    // provider: req.body.provider,
    // role: req.body.role
    cast: req.body.cast,
    address: req.body.address,
    documents: req.body.documents,
    careerGoals: req.body.careerGoals,
    tenthPercentage: req.body.tenthPercentage,
    twelfthPercentage: req.body.twelfthPercentage,
    neetScore: req.body.neetScore
  };

  if (password) {
    userData.password = password;
  }

  try {
    const newUser = await User.create(userData);
    sendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new ErrorResponse("Please provide Email", 400));
  }

  try {
    const findUser = await User.findOne({ email }).select("+password");

    // If user exists and is authenticated via a third-party provider
    if (findUser && !findUser.password) {
      // const token = generateToken({ id: findUser._id });
      const token = generateToken(findUser._id, findUser.role);

      await User.findByIdAndUpdate(
        { _id: findUser._id?.toString() },
        { activeToken: token },
        { new: true }
      );

      const user = {
        success: true,
        user: {
          _id: findUser._id,
          firstname: findUser.firstname,
          lastname: findUser.lastname,
          email: findUser.email,
          // provider: findUser.provider,
        },
        token: token,
      };

      return res.status(200).json(user);
    }

    // If user exists and has a password, continue with password-based authentication
    if (findUser && (await findUser.matchPasswords(password))) {
      // const token = generateToken({ id: findUser._id });
      const token = generateToken(findUser._id, findUser.role);
      
      await User.findByIdAndUpdate(
        { _id: findUser._id?.toString() },
        { activeToken: token },
        { new: true }
      );

      const user = {
        success: true,
        user: {
          _id: findUser._id,
          firstname: findUser.firstname,
          lastname: findUser.lastname,
          email: findUser.email,
          // provider: findUser.provider,
        },
        token: token,
      };

      return res.status(200).json(user);
    } else {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.adminRegister = async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await Admin.findOne({ email });

  if (existingUser) {
    return res.status(203).json({ error: "Admin with this email already exists." });
  }

  const userData = {
    email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobile: req.body.mobile,
    role: req.body.role
  };

  if (password) {
    userData.password = password;
  }

  try {
    const newUser = await Admin.create(userData);
    sendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const findAdmin = await Admin.findOne({ email }).select("+password");
    
    if (!findAdmin) {
      throw new Error("Admin not found");
    }

    if (findAdmin.role !== "admin") {
      throw new Error("Not Authorized");
    }

    if (await findAdmin.matchPasswords(password)) {
      // const token = generateToken({ id: findAdmin._id });
      const token = generateToken(findAdmin._id, findAdmin.role);

      await Admin.findByIdAndUpdate(
        { _id: findAdmin._id?.toString() },
        { activeToken: token },
        { new: true }
      );
      const user = {
        success: true,
        user: {
          _id: findAdmin._id,
          firstname: findAdmin.firstname,
          lastname: findAdmin.lastname,
          email: findAdmin.email,
        },
        token: token,
      };

      return res.status(200).json(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      token = authHeader;
    }
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findOne({_id:decodedData?.id});

    if (userData.activeToken && userData.activeToken === token) {
      const user = await User.findOneAndUpdate(
        { _id: decodedData.id, activeToken: token },
        { $unset: { activeToken: "" } },
        { new: true }
      );
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid session or token, please login again" });
      }
      return res.status(200).json({
        message: `${userData._id} is Logout Successfully`,
      });
    } else {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      console.error("Other error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
};

exports.adminLogout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      token = authHeader;
    }
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await Admin.findOne({_id:decodedData?.id});

    if (userData.activeToken && userData.activeToken === token) {
      const user = await Admin.findOneAndUpdate(
        { _id: decodedData.id, activeToken: token },
        { $unset: { activeToken: "" } },
        { new: true }
      );
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid session or token, please login again" });
      }
      return res.status(200).json({
        message: `${userData._id} is Logout Successfully`,
      });
    } else {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      console.error("Other error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
};

exports.generateOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    const otp = new OTP({ user: user._id, otp: otpCode });
    await otp.save();

    // await sendOTP(user.email, otpCode);

    res.status(200).json({ message: 'OTP sent successfully', otpCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otpRecord = await OTP.findOne({ user: userId, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Delete OTP record after verification
    await OTP.deleteOne({ _id: otpRecord._id });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json(`${email} this email is not registered`);
    }
    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `http://localhost:4000/auth/reset-password/${resetToken}`;

    const message = `
    <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
        }
        .header {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 10px;
            border-top: 1px solid #e0e0e0;
            border-radius: 0 0 5px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Hello ${user.firstname},</h2>
        </div>
        <div class="content">
            <p>We have received a request to reset your password for your account on <strong>Event Panel</strong>. If you did not request this change, you can ignore this email and your password will not be changed.</p>
            
            <p>To reset your password, please click on the following link and follow the instructions:</p>
            
            <p><a class="button" href="${resetUrl}">Reset Password</a></p>
            
            <p>This link will expire in <strong>15 minutes</strong> for security reasons. If you need to reset your password after this time, please make another request.</p>
        </div>
        <div class="footer">
            <h3>Thank you,</h3>
            <h3>Event Team </h3>
        </div>
    </div>
</body>
</html>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Account Password Reset Link",
        text: message,
      });
      res.status(200).json({
        success: true,
        data: "Password Reset Email Sent Successfully",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save();

      return res
        .status(500)
        .json({ success: false, data: "Email could not be sent" });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      passwordResetToken: req.params.resetToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    
    if (!user) {
      res.status(400).json("Invalid Reset Token");
      
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    res.status(201).json({
      success: true,
      data: "Password Reset Successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyUser = async (req, res) => {
  const {token } = req.params;

  try {
    const decodedData = verifyToken(token);

    if (!decodedData) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const { id } = decodedData;

    const LoggedUser = await User.findOne({ _id: id, activeToken: token }).select("-password -activeToken");

    if (!LoggedUser) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    return res.status(200).json({ data: LoggedUser, message: "Verification Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.verifyAdmin = async (req, res) => {
  const {token } = req.params;

  try {
    const decodedData = verifyToken(token);

    if (!decodedData) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const { id } = decodedData;

    const LoggedUser = await Admin.findOne({ _id: id, activeToken: token }).select("-password -activeToken");

    if (!LoggedUser) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    return res.status(200).json({ data: LoggedUser, message: "Verification Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.updatedUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
};

exports.getallUser = async (req, res) => {
  try {
    const { page = 1, limit = 10} = req.query;
    const searchQuery = req.query.search;
    
    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(limit, 10);

    const userQuery = User.find().populate("wishlist");

    if (searchQuery) {
      userQuery.or([
        { firstname: { $regex: new RegExp(searchQuery, "i") } },
        { lastname: { $regex: new RegExp(searchQuery, "i") } },
        { email: { $regex: new RegExp(searchQuery, "i") } },
        { mobile: { $regex: new RegExp(searchQuery, "i") } },
      ]);
    }

    // Count total items
    const totalItems = await User.countDocuments(userQuery);

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const skip = (currentPage - 1) * itemsPerPage;
    const users = await userQuery.sort({ firstname: 1 }).skip(skip).limit(itemsPerPage).exec();

    res.json({
      totalItems,
      totalPages,
      currentPage,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getaUser = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const getaUser = await User.findById(_id).populate("wishlist")
    res.json({
      getaUser
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("wishlist");
    res.status(200).json({
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteaUser = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user._id;

    const user = await User.findById(_id).select("+password");
    // Verify the current password
    const isPasswordMatch = await user.matchPasswords(oldPassword);
    if (!isPasswordMatch) {
      return res.status(203).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    user.passwordChangedAt = Date.now();
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Password change failed" });
  }
};

exports.addToWishlist = async (req, res) => {
  const { collegeId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const alreadyAdded = user.wishlist.includes(collegeId);

    if (alreadyAdded) {
      return res.status(400).json({ error: "College already added to wishlist" });
    }

    user.wishlist.push(collegeId);
    await user.save();

    res.json({ message: "College added to wishlist successfully", wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding college to wishlist" });
  }
};

exports.deleteAllWishlistItems = async (req, res) => {
  const { _id } = req.user._id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.wishlist = [];

    await user.save();

    res.json({ message: "All wishlist items deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting wishlist items" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { collegeId } = req.params;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const collegeIndex = user.wishlist.indexOf(collegeId);

    if (collegeIndex === -1) {
      return res.status(400).json({ error: "College not found in wishlist" });
    }

    user.wishlist.splice(collegeIndex, 1);
    await user.save();

    res.json({ message: "College removed from wishlist successfully", wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while removing college from wishlist" });
  }
};