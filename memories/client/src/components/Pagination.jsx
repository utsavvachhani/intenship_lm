import React,{ useEffect } from 'react'
import {Pagination, PaginationItem} from '@mui/material';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts.jsx'
import { usePaginationStyles } from '../Styles/styles.js'

const Paginate = ({page}) => {
    const classes = usePaginationStyles();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.posts);
    // console.log(numberOfPages);
    // console.log(useSelector((state) => state.posts));
    
    
    useEffect(()=>{
        if(page) dispatch(getPosts(page));
        
    },[page, dispatch]);
    
    return(
        <Pagination 
            classes={{ul: classes.ul}}
            count={numberOfPages || 1}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem { ...item } component={Link} to={ `/posts?page=${item.page}`} />
            )}
        />
    )
}


export default Paginate;