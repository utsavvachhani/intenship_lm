import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { searchItems } from './searchItems.js';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useStyles } from '../../styles.js';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const classes = useStyles();
  const navigate = useNavigate();
  const handleSearch = () => {
    // You can replace this with navigation or a filtering function
    navigate(`products/${inputValue.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      id="search-bar"
      options={searchItems.map((option) => option.title)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      sx={{
        backgroundColor: 'white',
        borderRadius: '25px',
        width: {
          xs: '100%',
          sm: '100%',
          md: '100%',
          lg: 400,
        },
        boxShadow: 20,
        '& .MuiInputBase-root': {
          borderRadius: '30px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiAutocomplete-listbox': {
          padding: 0,
        },
        '& .MuiAutocomplete-option': {
          padding: 0,
        },
      }}
      renderOption={(props, option) => (
        <ListItem 
          {...props} 
          sx={{
            borderRadius: '25px',
            margin: '4px 8px',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
              borderLeft: '3px solid black',
            }
          }}
        >
          <ListItemText primary={option} />
        </ListItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search products..."
          InputProps={{
            ...params.InputProps,
            type: 'search',
            sx: {
              paddingY: '6px',
              paddingLeft: 2,
              fontSize: { xs: '14px', md: '16px' },
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '2px solid black',
                  borderLeft: '3px solid black',
                },
                fontWeight: 'bold',
              },
            },
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={handleSearch} className={`${classes.searchButton}`}>
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

export default SearchBar;