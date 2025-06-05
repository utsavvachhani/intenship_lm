import React,{ useState } from 'react'
import {Card, Divider, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useStyles from './styles.js';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost, likePost } from '../../../actions/posts.jsx'
import { useNavigate } from'react-router-dom';

function Post({post, setCurrentId}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);

  const openPost = () => {  
    navigate(`/posts/${post._id}`);
  };

  const userId = user?.result?.sub || user?.result?._id;
  const hasLikePost = post.likes.find((like) => like === (userId));
  const handleLike = async() => {
    dispatch(likePost(post._id))
    if (hasLikePost){
      setLikes(post.likes.filter((id) => id !== (userId)))
    } else {
      setLikes([...post.likes, userId])
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={classes.card} elevation={20} >
      <ButtonBase component="div" className={classes.cardActions} onClick={openPost}>

      <CardMedia 
      className={classes.media} 
      image={post.selectedFile || 'data:application/octet-stream;base64,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' }
      title={post.title}
      />
      <div className={classes.overlay}>
      <Typography variant="h6">{post.name}</Typography>
      <Typography variant="body">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button 
          style={{color: "white"}} 
          size="small" 
          onClick={(e) => {  
            e.stopPropagation();
            setCurrentId(post._id)}}>
          <MoreHorizIcon fontSize="default"/>
        </Button>
      </div>
    )}
    <div className={classes.details}>
      <Typography variant="body2" className={classes.tag} >{post.tags.map((tag)=> `#${tag} `)}</Typography>
    </div> 
    <Divider className={classes.divider} />
    
    <Typography className={classes.title} gutterBottom>{post.title}</Typography>
    <Divider className={classes.divider} />
    <CardContent>
      <Typography  variant="body2" className={classes.message} component="p" >{post.message}</Typography>
    </CardContent>

    </ButtonBase>
    <CardActions className={classes.cardFooter}>
      <Button size="small" className={classes.likeButton} disabled={!user?.result} onClick={handleLike}>
        <Likes />
      </Button>
      {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" className={classes.deleteButton} onClick={()=>{ dispatch(deletePost(post._id))}}>
          <DeleteIcon fontSize="small"/>
          Delete
        </Button>
      )}
    </CardActions>
    </Card>
  )
}

export default Post;