import React, { useState, useEffect } from 'react'
import {TextField, Button, Typography, Paper} from '@mui/material'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {useFormStyles} from '../../Styles/styles';

function Form({currentId, setCurrentId }) {
  const classes = useFormStyles();
  const [postData, setPostData] = useState({ title: '', message:'',tags:'',selectedFile:''});
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    if(post) setPostData(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(currentId);
    
    if(currentId === null){
      dispatch(createPost({ ...postData, name : user?.result?.name},navigate));
      clear() 
    }
    else{
      dispatch(updatePost(currentId, {...postData, name : user?.result?.name}));
      clear()
    }
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })}

  
  if(!user?.result?.name) {
    return (
      <Paper 
        className={classes.paper}
      >
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and likes other Memories.
        </Typography>
      </Paper>
    )
  }
  
  return (
    <>  
      <Paper className={classes.paper} >
        <form autoComplete="off" noValidate  
        onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? `Editing` : `Creating`} a Memory</Typography>
          {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}  onChange={(e) => setPostData({...postData,creator: e.target.value})} /> */}
          <TextField style={{margin: '3px 0px'}} name="title" variant="outlined" label="Title" fullWidth value={postData.title}  onChange={(e) => setPostData({...postData,title: e.target.value})} />
          <TextField style={{margin: '3px 0px'}} name="message" variant="outlined" label="Message" fullWidth value={postData.message}  onChange={(e) => setPostData({...postData,message: e.target.value})} />
          <TextField style={{margin: '3px 0px'}} name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}  onChange={(e) => setPostData({...postData,tags: e.target.value.split(',')})} />
          <div className={classes.fileInput}
          >
            <FileBase
              type='file'
              multiple={false}
              onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
              />
          </div>

          {postData.selectedFile && (
            <div style={{ textAlign: 'center', margin: '10px 0' }}>
              <img
                src={postData.selectedFile}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
              />
            </div>
          )}

          <Button 
          className={classes.buttonSubmit}
           variant="contained" size="large" type='submit' fullWidth   disabled={!postData.title || !postData.message} >Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Remove</Button>
        </form>
      </Paper>
    </>
  )
}

export default Form;