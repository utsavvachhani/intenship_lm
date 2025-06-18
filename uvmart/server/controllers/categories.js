import Categories from '../models/categories/categories.js';

export const addCategories = async (req, res) => {
  console.log("Add Categories Called !!");

  try {
    const { id, formData } = req.body;
    const _id = id;
    const {
        categories,
        description,
        categoriesImage,
        parentCategories
    } = formData
    
    if (!categories || !description || !categoriesImage) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingCategory = await Categories.findOne({ categories : categories });
    if (existingCategory) {
      
      return res.status(409).json({ message: 'Category already exists. Use it directly.' });
    }

    let parentCategoryIds = [];
    if (Array.isArray(parentCategories) && parentCategories.length > 0) {
      const foundParents = await Categories.find({
        categories: { $in: parentCategories }
      });

      if (foundParents.length !== parentCategories.length) {
        const foundNames = foundParents.map(p => p.categories);
        const missing = parentCategories.filter(name => !foundNames.includes(name));
        return res.status(400).json({ message: `Parent category not found: ${missing.join(', ')}` });
      }

      parentCategoryIds = foundParents.map(cat => cat._id);
    }

    const newCategory = new Categories({
      categories,
      parentCategories: parentCategoryIds,
      description,
      categoriesImage,
      users: [_id],       
      issuedBy: [],       
      isVerified: false
    });

    await newCategory.save();

    res.status(200).json({ message: 'Category request submitted successfully!' });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const fetchUnverifiedCategories = async (req, res) => {
  try {
    const unverifiedCategories = await Categories.find({ isVerified: false })
      .populate('users', 'fullName email role')               
      .populate('issuedBy.admin', 'fullName email')                  
      .populate('parentCategories', 'categoriesName')          
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(unverifiedCategories);
  } catch (error) {
    console.error('Error fetching unverified categories:', error.message);
    res.status(500).json({ message: 'Server Error while fetching unverified categories' });
  }
};

export const approveCategory = async (req, res) => {
  console.log("approved");
  
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const category = await Categories.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.isVerified = true;
    category.status = 'Approved';
    category.issuedBy.push({
      admin: req.user.id,
      action: 'approved',
      issuedAt: new Date()
    });  

    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error('Error approving category:', error);
    res.status(500).json({ message: 'Server error while approving category' });
  }
};

export const rejectCategory = async (req, res) => {
  console.log("removed categories               ");

  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const category = await Categories.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.isVerified = true;
    category.status = 'Rejected';
    category.issuedBy.push({
      admin: req.user.id,
      action: 'rejected',
      issuedAt: new Date()
    }); 
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error('Error rejecting category:', error);
    res.status(500).json({ message: 'Server error while rejecting category' });
  }
};

