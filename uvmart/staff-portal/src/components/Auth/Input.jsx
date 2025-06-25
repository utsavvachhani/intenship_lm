import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useStyles } from '../../styles.js';

const Input = ({ name, handleChange, value, label, autoFocus, type, handleShowPassword, row }) => {
    const classes = useStyles();
    return (
        <Grid container xs={12} style={{ padding: 0 }} >
            <TextField className={classes.input}
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                value={value}
                multiline={Boolean(row)} 
                rows={row ? row : 1}
                InputLabelProps={{
                    style: { color: '#000000' },
                }}
                InputProps={name === 'password' || name === 'otp' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : undefined}
            />
        </Grid>
    );
}

export default Input