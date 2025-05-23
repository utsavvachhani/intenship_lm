import React,{useState,useEffect} from "react";
import { Container, Grow, Grid } from "@mui/material";
import Form from "./../Form/Form";
import Posts from "./../Posts/Posts";
import useStyles from '../../styles.js';
import { getPosts } from '../../actions/posts.jsx'
import { useDispatch } from "react-redux";

function Home() {
  const [currentId,setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    // console.log('currentID');
  }, [dispatch, currentId]); 
  return (
    <div>
    <Grow in> 
        <Container>
          <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>              
            </Grid>
          </Grid>
        </Container>
    </Grow>

    </div>
  )
}

export default Home
