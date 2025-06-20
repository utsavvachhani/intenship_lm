import React, { useState } from 'react'
import { Container, Avatar, Paper, Typography, Grid, TextField, Button } from '@mui/material'
import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Input from '../Auth/Input';
import { useStyles } from '../../styles.js';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addedCategories } from '../../actions/categories.jsx'
import { MuiChipsInput } from 'mui-chips-input'

const intialData = { categories: '', parentCategories: [], description: '', categoriesImage: '' }
function AdddedCategories() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(intialData);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.user);
  
  const handleParentCategoriesChange = (newCategories) => {
    setFormData(prev => ({ ...prev, parentCategories: newCategories }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    setLoading(true);
    const res = await dispatch(addedCategories({ id: userData?._id, formData }));
    if (res?.success) {
      toast.success('🎉 Request Sent !!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark"
      });

      setTimeout(() => navigate('/verifying'), 500);
    } else {
      toast.error(res?.message || 'Request Failed!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark"
      });
    }
    setLoading(false)
  };
  const handleChange = (e) => {
    // handle input changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Container component="main" maxWidth="xs" className='m-20 p-10' sx={{ borderRadius: '20px' }}>
      <Paper className={``} elevation={3}>
        <div className='flex p-5 justify-center items-center gap-2 '>
          <Avatar sx={{ backgroundColor: "black" }}>
            <AddCircleOutlineIcon sx={{ color: '#ffffff' }} />
          </Avatar>
          <Typography variant="h5" fontFamily="revert-layer" >Added Categories </Typography>
        </div>
        <form className="m-5 mt-0" onSubmit={handleSubmit} >
          <Grid>
            <Input name="categories" label="Categories Name" handleChange={handleChange} autoFocus />
            <MuiChipsInput
              style={{ margin: '10px 0' }}
              value={formData.parentCategories}
              onChange={handleParentCategoriesChange}
              disableDeleteOnBackspace
              label="Parent Categories"
              variant="outlined"
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />

            <TextField
              id="description"
              label="Description"
              name='description'
              variant="outlined"
              onChange={handleChange}
              multiline
              rows={4}
              value={formData.description}
              style={{ color: 'black', marginRight: '6px', padding: '0px' }}
              fullWidth
              InputLabelProps={{
                style: { color: 'black' },
              }}
            />

            <div style={{ marginBottom: '1rem', margin: '0.6rem 0' }}>
              <input
                id="categoriesImageInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, categoriesImage: reader.result });
                  };
                  if (file) reader.readAsDataURL(file);
                }}
              />

              <label
                htmlFor="categoriesImageInput"
                style={{
                  display: 'inline-block', width: '220px',
                  height: '30px', border: '2px dashed #ccc',
                  borderRadius: '8px', cursor: 'pointer',
                  textAlign: 'center', backgroundColor: '#f9f9f9',
                  fontWeight: 'bold', color: '#555',
                  transition: '0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = '#333')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = '#ccc')}
              >
                Chose categories Image
              </label>

              {formData.categoriesImage && (
                <div style={{ marginTop: '1rem' }}>
                  <img
                    src={formData.categoriesImage}
                    alt="Preview"
                    style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                  />
                </div>
              )}

            </div>
            <Button variant="contained" className={classes.siginbutton} type="submit" fullWidth >
              {loading ? 'Requested ...' : 'Requeste For Add Categories'}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>

  )
}

export default AdddedCategories