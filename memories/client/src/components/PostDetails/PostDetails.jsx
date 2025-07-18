import React,{ useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom'
import { getPost, getPostsBySearch } from '../../actions/posts.jsx';
import CommentSection from './CommentSection.jsx';
import {usePostDetailsStyles} from '../../Styles/styles.js';

function PostDetails() {
  const { post, posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = usePostDetailsStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  }
  // console.log(`Post : `,post,`  ID : `,id);
  useEffect(() => {
      dispatch(getPost(id));
    }, [id, dispatch]);


    useEffect(() => {
      if(post){
        dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',')} ));
      }
    }, [post]);

  // if (!post) return null;
  
  if(!post) {
    return <Paper className={classes.loadingPaper} elevation={7}>
      <CircularProgress size={100}   value={60} />
    </Paper>
  } 

  // console.log(`posts`, posts);
  const recommendedPosts = posts.filter(({_id}) => _id !== post._id);
  
  return (  
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography style={{fontSize: '2.5rem',}} className={classes.title}>{post.title || 'Data Loading'}</Typography>
          <Typography gutterBottom className={classes.tags}>{post.tags.map((tag) => `#${tag}  `)}</Typography>
          <Divider style={{ margin: '10PX 0' }} />
          <Typography className={classes.message}>{post.message}</Typography>
          <Divider style={{ margin: '10PX 0' }} />

          <Typography variant="h6" className={classes.creator}><strong>Created by:</strong> {post.name}</Typography>
          <Divider style={{ margin: '10PX 0' }} />
          <Typography variant="body1" className={classes.date}>{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '10PX 0' }} />
          {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography> */}
          <Divider style={{ margin: '10PX 0' }} />

          <Typography variant="body1">
            <strong><CommentSection post={post} /></strong>
          </Typography>
          
          <Divider style={{ margin: '10PX 0' }} />
        </div>  
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>

      {
        recommendedPosts.length ? (
          <div className={classes.recommendedMedia} style={{paddingBottom: "20px"}} >
            <Typography gutterBottom variant="h5"  > You Might also Like : </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {
                recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                  <div style={{margin: '20px', cursor: 'pointer'}} className={classes.recommendedCard} onClick={() => { openPost(_id)}} key={_id}>
                    <Typography gutterBottom style={{ fontSize: '1rem ', }} className={classes.title} >{title}</Typography>
                    <Typography gutterBottom className={classes.creator} > <strong>Created by</strong> :  {name} </Typography>
                    <Divider style={{ margin: '10PX 0' }} />
                    <Typography gutterBottom  className={classes.message} > {message} </Typography>
                    <Typography gutterBottom  style={{alignItems: 'center', justifyContent: 'center'}}><strong>Likes :</strong>   {likes.length} </Typography>
                    {/* <img src={selectedFile} width="200px" /> */}
                     <img className={classes.recommendedPhoto} src={selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                  </div>
                ))
              }
            </div>
          </div>
        ) : null  // No recommended posts found. 
        // (
          
        //   // <Typography gutterBottom variant="h4" > No Regamatation</Typography>
        // )
      }
    </Paper>
  )
}

export default PostDetails
