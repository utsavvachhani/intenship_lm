import React,{ useState, useRef } from "react"
import { Typography, TextField, Button } from '@mui/material'
import { useDispatch } from "react-redux"
import { commentPost } from '../../actions/posts.jsx'
import {usePostDetailsStyles} from '../../Styles/styles.js';

function CommentSection({ post }) {
  const classes = usePostDetailsStyles();
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState(post?.comments)
  const dispatch = useDispatch()
  const commentRef = useRef();
  const user = JSON.parse(localStorage.getItem('profile'))

  const handleClick = async() => {
    const finalCommit = `${user?.result?.name} : ${comment} `;
    const newCommits = await dispatch(commentPost(finalCommit, post._id));
    setComments(newCommits);
    setComment('');

    commentRef.current.scrollIntoView({ behavior:'smooth' } );
  }
    return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant="h6">
                  <strong>Comments</strong>
            </Typography>
            {   comments &&  (
                comments.map((c, i) => (
                        <Typography key={i} variant="subtitle1" gutterBottom> 
                          <strong>
                            {c.split(': ')[0]} 
                          </strong>
                            {c.split(':')[1]} 
                        </Typography>
                ))
            
            )}
        </div>
        <div ref={commentRef}/>
        {
          !user?.result?.name && !user?.result?.firstName && !user?.result?.lastName  ? (
            <Typography variant="subtitle1" gutterBottom> Please Sign In to Comment </Typography>
          ) : 
          (
            <div className={classes.commentInputContainer}>
                <Typography gutterBottom variant="h6">
                  <strong>
                    Write a Comments
                  </strong>
                </Typography>
                <TextField 
                    fullWidth
                    rows={4}
                    variant="outlined"
                    label="Your Comment"
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value) }
                />
                <Button className={classes.buttonSubmit} style={{ marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick} >
                    Commit
                </Button>
            </div>
          )
        } 
      </div>
    </div>
  )
}

export default CommentSection
