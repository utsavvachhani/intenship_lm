import Staff from "../models/staff/staff.js";
import StaffVerification from "../models/staff/staffVarification.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTP, sendStaffStatusEmail } from "../utils/sendMessage.js";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const GenerateToken = ({ id, role }) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const getProfile = (req, res) => {
  const {
    _id,
    fullName,
    email,
    mobile,
    role,
    profilePic,
    isVerified,
    isVerifiedByAdmin,
    status,
    createdAt,
  } = req.staff;
  res.json({
    user: {
      _id,
      fullName,
      email,
      mobile,
      role,
      profilePic,
      isVerified,
      isVerifiedByAdmin,
      status,
      createdAt,
    },
  });
};

export const signUp = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      confirmPassword,
      role,
      profilePic,
      messageReq,
    } = req.body;

    // Basic validation
    if (
      !fullName ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !role ||
      !profilePic
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await Staff.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Staff already exists." });
    }

    const existingVerification = await StaffVerification.findOne({ email });
    if (existingVerification) {
      await StaffVerification.deleteOne({ email }); // cleanup stale entry
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = generateOTP();

    const tempStaff = new StaffVerification({
      fullName,
      email,
      mobile,
      role,
      profilePic,
      password: hashedPassword,
      messageReq,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
    });

    await sendOTP(email, otp); // Implement email sender
    await tempStaff.save();

    res.status(200).json({
      success: true,
      email,
      message: "OTP sent. Please verify your email.",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup failed. Try again later." });
  }
};

export const verifySignup = async (req, res) => {
  console.log("Verification STAFF called");

  try {
    const { email, otp } = req.body;

    const userDetails = await StaffVerification.findOne({
      email,
      otp,
      otpExpires: { $gt: new Date() },
    });
    if (!userDetails)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    userDetails.isVerified = true;
    userDetails.otp = null;
    userDetails.otpExpires = null;
    await userDetails.save();

    const newUser = new Staff({
      fullName: userDetails.fullName,
      email: userDetails.email,
      mobile: userDetails.mobile,
      password: userDetails.password,
      role: userDetails.role,
      profilePic: userDetails.profilePic,
      messageReq: userDetails.messageReq,
      isVerified: true,
      createdAt: userDetails.createdAt,
    });
    await newUser.save();
    const token = GenerateToken({
      id: newUser._id,
      role: newUser.role,
    });
    await StaffVerification.deleteOne({ _id: userDetails._id });

    const user = {
      fullName: newUser.fullName,
      _id: newUser._id,
      email: newUser.email,
      mobile: newUser.mobile,
      role: newUser.role,
      profilePic: newUser.profilePic,
      isVerified: newUser.isVerified,
      isVerifiedByAdmin: newUser.isVerifiedByAdmin,
      status: newUser.status,
    };
    res
      .status(200)
      .json({ user, message: "User verified successfully", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDetails = await Staff.findOne({ email });
    if (!userDetails || !userDetails.isVerified)
      return res
        .status(401)
        .json({ message: "Might User are not register Yet!!" });

    const match = await bcrypt.compare(password, userDetails.password);
    if (!match)
      return res.status(401).json({ message: "Enter Your Correct Password" });

    const token = GenerateToken({
      id: userDetails._id,
      role: userDetails.role,
    });

    const user = {
      fullName: userDetails.fullName,
      _id: userDetails._id,
      email: userDetails.email,
      mobile: userDetails.mobile,
      role: userDetails.role,
      profilePic: userDetails.profilePic,
      isVerified: userDetails.isVerified,
      isVerifiedByAdmin: userDetails.isVerifiedByAdmin,
      status: userDetails.status,
      createdAt: userDetails.createdAt,
    };
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forget = async (req, res) => {
  console.log("Forget password triggered");

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Step 1: Check if user exists
    const user = await Staff.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No account found with this email" });
    }

    // Step 2: Generate OTP
    const otp = generateOTP();

    // Step 3: Clean up any previous verification entries
    await StaffVerification.deleteMany({ email });

    // Step 4: Move user data to verification DB
    const otpRecord = new StaffVerification({
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      password: user.password,
      role: user.role,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
      isVerified: false,
    });

    await otpRecord.save();

    // Step 5: Delete from main DB
    user.isVerified = false;
    await user.save();

    // Step 6: Send OTP
    await sendOTP(email, otp);

    // Step 7: Respond
    return res
      .status(200)
      .json({ email, message: "OTP sent to your email for password reset." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error: " + err.message });
  }
};

export const verifyingForeget = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find OTP record and ensure OTP is not expired
    const verificationRecord = await StaffVerification.findOne({
      email,
      otp,
      otpExpires: { $gt: new Date() },
    });

    if (!verificationRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP verified - update main User to isVerified: true
    const userDetails = await Staff.findOne({ email });
    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "User not found in main database" });
    }

    userDetails.isVerified = true;

    // Delete verification record
    await StaffVerification.deleteOne({ _id: verificationRecord._id });
    const token = jwt.sign({ id: userDetails._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await userDetails.save();

    const user = {
      fullName: newUser.fullName,
      _id: newUser._id,
      email: newUser.email,
      mobile: newUser.mobile,
      role: newUser.role,
      profilePic: newUser.profilePic,
      isVerified: newUser.isVerified,
      isVerifiedByAdmin: newUser.isVerifiedByAdmin,
      status: newUser.status,
    };
    res.status(200).json({
      user,
      message: "OTP verified successfully. You can now reset your password.",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  console.log("Updated Profiles !!");
  try {
    const { updatePayload } = req.body;
    const _id = req.params.id;

    const userDetails = await Staff.findOne({ _id });
    if (!userDetails) return res.status(401).json({ message: "Not Valid ID" });

    if (updatePayload.password || updatePayload.confirmPassword) {
      if (updatePayload.password !== updatePayload.confirmPassword) {
        return res
          .status(400)
          .json({ message: "Password doesn't match Confirm Password." });
      }
      const hashedPassword = await bcrypt.hash(updatePayload.password, 10);
      userDetails.password = hashedPassword;
    }

    if (updatePayload.fullName) userDetails.fullName = updatePayload.fullName;
    if (updatePayload.mobile) userDetails.mobile = updatePayload.mobile;
    if (updatePayload.profilePic)
      userDetails.profilePic = updatePayload.profilePic;
    await userDetails.save();

    const token = GenerateToken({
      id: userDetails._id,
      role: userDetails.role,
    });

    const user = {
      fullName: userDetails.fullName,
      _id: userDetails._id,
      email: userDetails.email,
      mobile: userDetails.mobile,
      role: userDetails.role,
      profilePic: userDetails.profilePic,
      status: userDetails.status,
      createdAt: userDetails.createdAt,
      isVerified: userDetails.isVerified,
      isVerifiedByAdmin: userDetails.isVerifiedByAdmin,
    };
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const fetchStaff = async (req, res) => {
  console.log("Fetch Staff Called !!");

  const {
    isVerified,
    isVerifiedByAdmin,
    status,
    searchQuery,
    page = 1,
    limit = 10,
  } = req.query;

  let filter = {};

  if (isVerified === "true") {
    filter.isVerified = true;
  } else if (isVerified === "false") {
    filter.isVerified = false;
  } else if (isVerified && isVerified !== "all") {
    return res
      .status(400)
      .json({ message: "Invalid query parameter for isVerified" });
  }

  if (isVerifiedByAdmin === "true") {
    filter.isVerifiedByAdmin = true;
  } else if (isVerifiedByAdmin === "false") {
    filter.isVerifiedByAdmin = false;
  } else if (isVerifiedByAdmin && isVerifiedByAdmin !== "all") {
    return res
      .status(400)
      .json({ message: "Invalid query parameter for isVerifiedByAdmin" });
  }

  if (status && status !== "all") {
    filter.status = status;
  }

  if (searchQuery && searchQuery.trim() !== "") {
    const regex = new RegExp(searchQuery.trim(), "i");
    filter.$or = [
      { fullName: { $regex: regex } },
      { email: { $regex: regex } },
    ];
  }

  // Pagination handling
  const parsedPage = Math.max(parseInt(page), 1);
  const parsedLimit = Math.min(parseInt(limit), 20);
  const skip = (parsedPage - 1) * parsedLimit;

  try {
    const total = await Staff.countDocuments(filter);

    const staff = await Staff.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit)
      .populate("issuedBy.admin", "fullName email");

    res.status(200).json({
      staff,
      pagination: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error("Error fetching staff:", error.message);
    res.status(500).json({ message: "Server Error while fetching staff" });
  }
};

export const approveStaff = async (req, res) => {
  console.log("approved staff");

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Category not found" });

    staff.isVerifiedByAdmin = true;
    staff.status = "Approved";
    staff.issuedBy.push({
      admin: req.user.id,
      action: "approved",
      issuedAt: new Date(),
    });

    await staff.save();

    const staffRequest = await Staff.findById(req.params.id).populate(
      "issuedBy.admin",
      "fullName email"
    );

    const lastApproved = staffRequest.issuedBy
      ?.filter((entry) => entry.action === "approved")
      ?.pop();

    const adminInfo = {
      fullName: lastApproved?.admin?.fullName || req.user?.fullName || "N/A",
      email: lastApproved?.admin?.email || req.user?.email || "N/A",
      issuedAt: lastApproved?.issuedAt
        ? new Date(lastApproved.issuedAt).toLocaleString()
        : new Date().toLocaleString(),
    };

    if (staffRequest && staffRequest.email) {
      await sendStaffStatusEmail(
        staffRequest.email,
        staffRequest,
        adminInfo,
        "approved"
      );
    } else {
      console.warn("No valid user email found to send approval email");
    }

    res.status(200).json(staff);
  } catch (error) {
    console.error("Error approving staff:", error);
    res.status(500).json({ message: "Server error while approving staff" });
  }
};

export const rejectStaff = async (req, res) => {
  console.log("removed staff");
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Category not found" });

    staff.isVerifiedByAdmin = true;
    staff.status = "Rejected";
    staff.issuedBy.push({
      admin: req.user.id,
      action: "rejected",
      issuedAt: new Date(),
    });
    await staff.save();

    const staffRequest = await Staff.findById(req.params.id).populate(
      "issuedBy.admin",
      "fullName email"
    );

    const lastApproved = staffRequest.issuedBy
      ?.filter((entry) => entry.action === "rejected")
      ?.pop();

    const adminInfo = {
      fullName: lastApproved?.admin?.fullName || req.user?.fullName || "N/A",
      email: lastApproved?.admin?.email || req.user?.email || "N/A",
      issuedAt: lastApproved?.issuedAt
        ? new Date(lastApproved.issuedAt).toLocaleString()
        : new Date().toLocaleString(),
    };

    if (staffRequest && staffRequest.email) {
      await sendStaffStatusEmail(
        staffRequest.email,
        staffRequest,
        adminInfo,
        "rejected"
      );
    } else {
      console.warn("No valid user email found to send approval email");
    }

    res.status(200).json(staff);
  } catch (error) {
    console.error("Error rejecting staff:", error);
    res.status(500).json({ message: "Server error while rejecting staff" });
  }
};
