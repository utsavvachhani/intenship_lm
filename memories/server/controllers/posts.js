import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async(req,res)=>{
    try {
        const postMessages = await PostMessage.find();
        // console.log(postMessages);
        // console.log('getMethods call');
        res.status(200).json(postMessages);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createPost = async(req,res) => {
    // console.log('REQ.BODY:', req.body);
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
        console.log("Post Added!!");
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async(req, res) => {
    const { id : _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id.');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{... post, _id}, { new: true });
    console.log('updated!!');    
    res.json(updatedPost);   
}

// export const deletePost = async(req, res) => { 
//     const { id } = req.params;
//     if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id.');

//     await postMessage.findByIdAndRemove(id);
//     console.log('deleted!');    
//     res.json({message: 'Post Deleted Successfuly!'});
// }


export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that id.');
  }

  try {
    await PostMessage.findByIdAndDelete(id);
    console.log('Post deleted:', id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('DELETE Error:', error);
    res.status(500).json({ message: error.message });
  }
};
