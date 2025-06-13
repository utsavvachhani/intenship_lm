import mongoose from "mongoose";
import Category from '../models/category.js';

export const getCategory = async(req,res) => {
    const { _category } = req.params;
    try {
        
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'No Products are avalabled with given category' });
    }
}