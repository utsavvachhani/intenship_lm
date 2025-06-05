import React from 'react'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress} from '@mui/material'
import Post from './Post/Post'
import useStyles from './styles.js';

function Posts({setCurrentId}) {
  const {posts, isLoading } = useSelector((state) => state.posts)
  const classes = useStyles();
  // console.log(posts);
  
  
  if(!posts.length && !isLoading) return <h3 style={{ color: '#ffffff' }}>No posts found</h3>

  return (
    isLoading ? <CircularProgress style={{ color: '#ffffff' }} size={60} />
               : (
      <Grid 
      className={classes.mainContainer} 
      container alignItems='stretch' spacing={3}>
        {/* {posts.map((post)=> { 
          // console.log(`post :`, post._id); 
          
          return (
          <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId}/>
          </Grid>

        )})} */}

        {Array.isArray(posts) &&
  posts.map((post, index) => {
    if (!post || !post._id) {
      console.warn(`Skipped invalid post at index ${index}:`, post);
      return null;
    }

    return (
      <Grid key={post._id} item xs={12} sm={6}>
        <Post post={post} setCurrentId={setCurrentId} />
      </Grid>
    );
  })}

      </Grid>
    )
  )
}

export default Posts
