import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
  categories: { type: String, required: true, trim: true, unique: true },
  parentCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories', default: null }],
  description: { type: String },
  categoriesImage: { type: String },
  isVerified: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff', default: [] }],
  issuedBy: [
    {
      admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
      action: { type: String, enum: ['approved', 'rejected'] },
      issuedAt: { type: Date, default: Date.now }
    }
  ],
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});


const Categories = mongoose.model('Categories', categoriesSchema);
export default Categories;
