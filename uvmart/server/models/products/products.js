import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, trim: true, unique: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },

  images: {
    type: [String],
    validate: {
      validator: function(arr) {
        return arr.length >= 1 && arr.length <= 8;
      },
      message: 'Products must have between 1 and 8 images.'
    }
  },

  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },

  status: {
    type: String,
    enum: ['shown', 'notShown'],
    default: 'shown'
  },

  hiddenBy: {
    user: { type: mongoose.Schema.Types.ObjectId, refPath: 'hiddenBy.role' },
    role: { type: String, enum: ['Admin', 'Staff'] },
    reason: { type: String, trim: true }
  },

  usedBy: [
    {
      staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
      quantityUsed: { type: Number, required: true },
      usedAt: { type: Date, default: Date.now }
    }
  ],

  updatedAt: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, refPath: 'updatedAt.role' },
      role: { type: String, enum: ['Admin', 'Staff'] },
      updatedAt: { type: Date, default: Date.now }
    }
  ],

  changeRequests: [
    {
      requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
      requestedAt: { type: Date, default: Date.now },
      details: { type: String, required: true, trim: true },
      approved: { type: Boolean, default: false },
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, 
      approvedAt: { type: Date }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

productSchema.pre('save', function (next) {
  next();
});

const Products = mongoose.model('Products', productSchema);
export default Products;
