import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    category: { type: String, required: true},
    id: { type: String}
},{
    
})

const Category =  mongoose.model('Category', categorySchema);
export default Category;