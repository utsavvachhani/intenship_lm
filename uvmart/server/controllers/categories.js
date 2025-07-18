import { flushCompileCache } from "module";
import Categories from "../models/categories/categories.js";
import Staff from "../models/staff/staff.js";
import { sendCategoryStatusEmail } from "../utils/sendMessage.js";

export const addCategories = async (req, res) => {
  console.log("Add Categories Called !!");

  try {
    const { id, formData } = req.body;
    const _id = id;
    const { categories, description, categoriesImage, parentCategories } =
      formData;

    if (!categories || !description || !categoriesImage) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const staff = await Staff.findOne({ _id });
    if (!staff) {
      return res
        .status(408)
        .json({ message: "Staff Does not Existes in Databse" });
    }
    if (
      staff.role !== "Vendor" &&
      staff.role !== "Warehouse Manager" &&
      staff.role !== "Supplier"
    ) {
      return res
        .status(408)
        .json({ message: "You have No access to added Iteams ..." });
    }
    if (staff.status !== "Approved") {
      return res.status(408).json({
        message:
          "You have No access to added Iteams ...!! Please Wait for Admin Verfiyed you",
      });
    }

    const existingCategory = await Categories.findOne({
      categories: categories,
    });
    if (existingCategory) {
      return res
        .status(409)
        .json({ message: "Category already exists. Use it directly." });
    }

    let parentCategoryIds = [];
    if (Array.isArray(parentCategories) && parentCategories.length > 0) {
      const foundParents = await Categories.find({
        categories: { $in: parentCategories },
      });

      if (foundParents.length !== parentCategories.length) {
        const foundNames = foundParents.map((p) => p.categories);
        const missing = parentCategories.filter(
          (name) => !foundNames.includes(name)
        );
        return res.status(400).json({
          message: `Parent category not found: ${missing.join(", ")}`,
        });
      }

      parentCategoryIds = foundParents.map((cat) => cat._id);
    }

    const newCategory = new Categories({
      categories,
      parentCategories: parentCategoryIds,
      description,
      categoriesImage,
      users: [_id],
      issuedBy: [],
      isVerified: false,
    });

    await newCategory.save();

    res
      .status(200)
      .json({ message: "Category request submitted successfully!" });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const fetchCategories = async (req, res) => {
  console.log(`Fetch Categories Called !!`);

  const { isVerified, status, searchQuery, page = 1, limit = 10 } = req.query;

  let filter = {};

  // Validate and parse isVerified
  if (isVerified === "true") {
    filter.isVerified = true;
  } else if (isVerified === "false") {
    filter.isVerified = false;
  } else if (isVerified && isVerified !== "all") {
    return res
      .status(400)
      .json({ message: "Invalid query parameter for isVerified" });
  }

  // Status filter
  if (status && status !== "all") {
    filter.status = status;
  }

  // Search filter
  if (searchQuery && searchQuery.trim() !== "") {
    filter.categories = { $regex: searchQuery.trim(), $options: "i" };
  }

  // Convert to numbers and validate
  const parsedPage = parseInt(page);
  const parsedLimit = Math.min(parseInt(limit), 20); // cap at 20

  const skip = (parsedPage - 1) * parsedLimit;

  try {
    const total = await Categories.countDocuments(filter); // for frontend pagination

    const categories = await Categories.find(filter)
      .populate("users", "fullName email role")
      .populate("issuedBy.admin", "fullName email")
      .populate("parentCategories", "categories")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit);

    res.status(200).json({
      categories,
      pagination: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    res.status(500).json({ message: "Server Error while fetching categories" });
  }
};

export const getCategoriesByStaffId = async (req, res) => {
  console.log(`Fetch Categories By Staff Called !!`);

  const { isVerified, status, searchQuery, page = 1, limit = 10 } = req.query;
  const staffId = req.params.id;

  let filter = {};
  // Validate staffId
  if(staffId){
    filter.users = staffId;
  }

  // Validate and parse isVerified
  if (isVerified === "true") {
    filter.isVerified = true;
  } else if (isVerified === "false") {
    filter.isVerified = false;
  } else if (isVerified && isVerified !== "all") {
    return res
      .status(400)
      .json({ message: "Invalid query parameter for isVerified" });
  }

  // Status filter
  if (status && status !== "all") {
    filter.status = status;
  }

  // Search filter
  if (searchQuery && searchQuery.trim() !== "") {
    filter.categories = { $regex: searchQuery.trim(), $options: "i" };
  }

  // Convert to numbers and validate
  const parsedPage = parseInt(page);
  const parsedLimit = Math.min(parseInt(limit), 20); // cap at 20

  const skip = (parsedPage - 1) * parsedLimit;

  try {
    const total = await Categories.countDocuments(filter); // for frontend pagination

    const categories = await Categories.find(filter)
      .populate("users", "fullName email role")
      .populate("issuedBy.admin", "fullName email")
      .populate("parentCategories", "categories")
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json({
      categories,
      pagination: {
        total,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(total / parsedLimit),
      },});
  } catch (error) {
    console.error("Error fetching unverified categories:", error.message);
    res
      .status(500)
      .json({ message: "Server Error while fetching unverified categories" });
  }
};

export const approveCategory = async (req, res) => {
  console.log("approved");

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const category = await Categories.findById(req.params.id)
      .populate("users", "fullName email")
      .populate("parentCategories", "categories")
      .populate("issuedBy.admin", "fullName email");

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.isVerified = true;
    category.status = "Approved";
    category.issuedBy.push({
      admin: req.user.id,
      action: "approved",
      issuedAt: new Date(),
    });

    await category.save();

    const categoryRequest = await Categories.findById(req.params.id)
      .populate("users", "fullName email")
      .populate("parentCategories", "categories")
      .populate("issuedBy.admin", "fullName email");

    const lastApproved = categoryRequest.issuedBy
      ?.filter((entry) => entry.action === "approved")
      ?.pop();

    const adminInfo = {
      fullName: lastApproved?.admin?.fullName || req.user?.fullName || "N/A",
      email: lastApproved?.admin?.email || req.user?.email || "N/A",
      issuedAt: lastApproved?.issuedAt
        ? new Date(lastApproved.issuedAt).toLocaleString()
        : new Date().toLocaleString(),
    };

    if (categoryRequest.users?.length && categoryRequest.users[0].email) {
      await sendCategoryStatusEmail(
        categoryRequest.users[0].email,
        categoryRequest,
        adminInfo,
        "approved"
      );
    } else {
      console.warn("No valid user email found to send approval email");
    }

    res.status(200).json(categoryRequest);
  } catch (error) {
    console.error("Error approving category:", error);
    res.status(500).json({ message: "Server error while approving category" });
  }
};

export const rejectCategory = async (req, res) => {
  console.log("removed categories               ");

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const category = await Categories.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.isVerified = true;
    category.status = "Rejected";
    category.issuedBy.push({
      admin: req.user.id,
      action: "rejected",
      issuedAt: new Date(),
    });
    await category.save();

    const categoryRequest = await Categories.findById(req.params.id)
      .populate("users", "fullName email")
      .populate("parentCategories", "categories")
      .populate("issuedBy.admin", "fullName email");

    const lastApproved = categoryRequest.issuedBy
      ?.filter((entry) => entry.action === "rejected")
      ?.pop();

    const adminInfo = {
      fullName: lastApproved?.admin?.fullName || req.user?.fullName || "N/A",
      email: lastApproved?.admin?.email || req.user?.email || "N/A",
      issuedAt: lastApproved?.issuedAt
        ? new Date(lastApproved.issuedAt).toLocaleString()
        : new Date().toLocaleString(),
    };

    if (categoryRequest.users?.length && categoryRequest.users[0].email) {
      await sendCategoryStatusEmail(
        categoryRequest.users[0].email,
        categoryRequest,
        adminInfo,
        "rejected"
      );
    } else {
      console.warn("No valid user email found to send approval email");
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error rejecting category:", error);
    res.status(500).json({ message: "Server error while rejecting category" });
  }
};
