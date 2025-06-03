import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async(req,res)=>{
  const {page} = req.query;  
  console.log('getPosts called  ',page); 
    
    try {
      
      const LIMIT = 8;
      const startIndex = ((Number(page))-1)*LIMIT;
      const total = await PostMessage.countDocuments({});
      
      const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({ data: posts, currentPage : Number(page), numberOfPages: Math.ceil(total/LIMIT) });
        
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error);
        
    }
}

export const getPost = async(req, res) => {
  const { id } = req.params;
  console.log("getpost-id ");
  
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).send('No Post with that id.');
  // }
  try {
    const post = await PostMessage.findById(id);
    if(!post) return res.status(404).send('No Post with that id.');
    res.json(post);
    // console.log(post);
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


export const getPostsBySearch = async(req, res) => {
  const { searchQuery, tags } = req.query
  try {
    const title = new RegExp(searchQuery, 'i');
    const tagsArray = tags ? tags.split(',') : [];
    console.log('GetPost By Search');
    const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tagsArray } } ] });
    res.json({data:posts}); 
  // console.log(posts);
  } catch (error) {
        res.status(404).json({message: error.message});        
  }
}

export const createPost = async(req,res) => {
    // console.log('REQ.BODY:', req.userId);
    const post = req.body;
    const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
        // console.log(newPostMessage);
        
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


export const likePost = async (req,res) => {
  const { id } = req.params;
  if(!req.userId) return res.json({ message: "Unauthenticated"});
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Post with that id.');
  }

  try {
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId) );

    if(index === -1){
      post.likes.push(req.userId);
    }else { 
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {  new: true});
    res.json(updatedPost);
    console.log(`Liked ||`);
       
  } catch (error) {
    console.error('Like Error:', error);
    res.status(500).json({ message: error.message });    
  }
}


export const commentpost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const post = await PostMessage.findById(id);
    if(!post) return res.status(404).send('No Post with that id.');
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
    
    console.log(`Commented || `);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}