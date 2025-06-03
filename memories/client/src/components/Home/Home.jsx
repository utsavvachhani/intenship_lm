import React,{useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from "@mui/material";
import Form from "./../Form/Form";
import Posts from "./../Posts/Posts";
import { getPostsBySearch } from '../../actions/posts.jsx'
import { useDispatch } from "react-redux";
import Pagination from '../Pagination.jsx';
import {MuiChipsInput} from 'mui-chips-input';
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from './styles.js';

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId,setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [ search, setSearch] = useState('');
  const [ tags, setTags] = useState([])

  // useEffect(() => {
  //   dispatch(getPosts());
  //   // console.log('currentID');
  // }, [dispatch, currentId]); 

   
  const searchPost = () => {
    if(search.trim() || tags){
      dispatch(getPostsBySearch({ search: search, tags :  tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none' }`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if(e.key === 13){
      searchPost();
    }
  };

  const handleAdd = (tag) => {setTags(tag);};
  // const handleDelete = (tagDelete) => {setTags(tags.filter((tag) => tag!== tagDelete));};
  
  return (
    <div>
    <Grow in> 
        <Container maxWidth="xl">
          <Grid container className={classes.gridContainer} spacing={3}>
            <Grid item className={classes.postsGrid} >
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item className={classes.formGrid} >
              <AppBar className={classes.appBarSearch} position="static" variant="contained" color="inherit">
                <TextField 
                  name="search" 
                  variant="outlined" 
                  label="Sarch Memories" 
                  fullWidth
                  value={search}
                  onChange={( e ) => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <MuiChipsInput
                  style={{margin: '10px 0'}}
                  value={tags}    
                  onChange = {handleAdd}
                  // onDelete={handleDelete}
                  disableDeleteOnBackspace 
                  label="Search Tages"
                  variant="outlined"
                />

                <Button onClick={searchPost} className={classes.buttonSubmit}  variant="contained" color="primary" size="large" fullWidth > Search </Button>

              </AppBar>
                        
              <Form currentId={currentId} setCurrentId={setCurrentId}/>       

              //pagination
              {   
                (!searchQuery && !tags.length) && (
                  
                  <Paper className={classes.pagination} elevation={6}>
                    <Pagination page={page} />
                  </Paper>       
                )
              }
              
            </Grid>
          </Grid>
        </Container>
    </Grow>

    </div>
  )
}

export default Home
