import React from 'react';
import { TextField,Grid,InputAdornment,IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useAuthStyles} from '../../styles.js';

const Input = ({name,half,handleChange, label, autoFocus, type, handleShowPassword }) => {
    const classes = useAuthStyles();
  return (
    <Grid container xs={12} sm={half ? 4 : 12} style = {{padding : 0}} >
        <TextField className={classes.input}
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps = { name === 'password' ?  {
                endAdornment:(                
                <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                        {type === "password" ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            )
        } : undefined }
        />
    </Grid>
  );
}

export default Input