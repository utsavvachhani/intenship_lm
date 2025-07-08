import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Card, Typography, Button, Box } from '@mui/material';
import Input from '../Auth/Input.jsx';
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, loadUser } from '../../actions/auth.jsx';
import { useStyles } from '../../styles.js';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function UserProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const storedUser = useSelector((state) => state.auth.user)
  const [isMobileValid, setIsMobileValid] = useState(true);
  const id = storedUser?._id;
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (!storedUser) {
      dispatch(loadUser());
    }
  }, [dispatch, storedUser]);


  // FormData initialized with fullName, email, mobile from storedUser
  useEffect(() => {
    if (storedUser) {
      setFormData({
        fullName: storedUser.fullName || '',
        email: storedUser.email || '',
        mobile: storedUser.mobile || '',
        role: storedUser.role ,
        profilePic: storedUser.profilePic ,
        isVerifiedByAdmin: storedUser.isVerifiedByAdmin,
        status: storedUser.status,
        createdAt: storedUser.createdAt,
        password: '',
        confirmPassword: '',
      });
    }
  }, [storedUser,isEditing]);
  if (!storedUser || !formData) return <div>Loading profile...</div>;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeMobile = (newValue) => {
    setFormData({ ...formData, mobile: newValue });
    setIsMobileValid(matchIsValidTel(newValue));
  };
  const handleSave = async () => {
    // Passwords validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }

    // Only update fullName and password; email and mobile are not editable
    const updatePayload = {
      fullName: formData.fullName,
      mobile: formData.mobile,
      profilePic: formData.profilePic,
    };

    if (formData.password) {
      updatePayload.password = formData.password;
      updatePayload.confirmPassword = formData.confirmPassword;
    }

    // Dispatch update profile action
    const success = await dispatch(updateUserProfile(id, updatePayload));
    if (success) {
      toast.success('Profile updated successfully!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      setIsEditing(false);
    } else {
      toast.error('Profile update failed!', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Card className="p-6 m-7 max-w-md mx-auto rounded-xl shadow-md overflow-hidden ">
        <Typography className="flex justify-center text-3xl font-bold  " variant="h5">
          <AccountBoxIcon className={`mr-4`} fontSize="large" /> User Profile
        </Typography>
        <div className="w-full my-4 mx-auto h-1 bg-gray-300 rounded"></div>

        {

          !isEditing ? (
            <>
              <div className="flex justify-center ">
                {formData.profilePic && (
                  <img
                    src={formData.profilePic}
                    alt={formData.fullName}
                    style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', marginBottom: 16, border: '2px solid #000' }}
                  />
                )}
              </div>
              <Typography><strong>Full Name:</strong> {formData.fullName}</Typography>
              <Typography><strong>Email:</strong> {formData.email}</Typography>
              <Typography><strong>Mobile:</strong> {formData.mobile}</Typography>
              <Typography><strong>Role:</strong> {formData.role}</Typography>
              <Typography className='flex gap-3 font-bold'><strong>Verified By Admin:</strong>
                {formData.isVerifiedByAdmin ?
                  (<Typography className="approved-text text-3xl font-bold" component="p">
                    Approved
                  </Typography>)
                  :
                  (<Typography component="p" className="panding-text">Pandding</Typography>)}
              </Typography>
              <Typography className='flex gap-4' ><strong>Status : </strong>
                <Typography component="p" className={
                  formData.status === 'Pending'
                    ? 'pending-text'
                    : formData.status === 'Approved'
                      ? 'approved-text'
                      : formData.status === 'Rejected'
                        ? 'rejected-text'
                        : ''
                }>
                  {formData.status}
                </Typography>
              </Typography>
              <Typography>
                <strong>Created At:</strong>{' '}
                {formData.createdAt
                  ? new Date(formData.createdAt).toLocaleString()
                  : 'N/A'}
              </Typography>


              <Button className={classes.siginbutton} onClick={() => setIsEditing(true)} sx={{ mt: 2 }}>
                Edit Profile
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                {
                  formData.profilePic && (
                    <div style={{ marginBottom: '1rem', marginLeft: '1rem' }}>
                      <div className="flex justify-center ">
                        <img
                          src={formData.profilePic}
                          alt={formData.fullName}
                          style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: '50%', marginBottom: 16, border: '2px solid #000' }}
                        />
                      </div>
                      <input
                        id="profilePicInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, profilePic: reader.result });
                          };
                          if (file) reader.readAsDataURL(file);
                        }}
                      />

                      <label
                        htmlFor="profilePicInput"
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
                        Chose Profile Picture
                      </label>
                    </div>
                  )
                }
              </div>

              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                handleChange={handleChange}
                margin="dense"
                fullWidth
              />
              <Input
                label="Email"
                name="email"
                value={formData.email}
                handleChange={() => { }}
                fullWidth
                margin="dense"
                disabled
              />

              <MuiTelInput
                name="mobile"
                value={formData.mobile}
                onChange={handleChangeMobile}
                fullWidth
                defaultCountry="IN"
              />
              {!isMobileValid && (
                <span style={{ color: 'red', fontSize: '0.875rem' }}>
                  Please enter a valid mobile number.
                </span>
              )}

              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type="password"
                margin="dense"
                fullWidth
              />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                margin="dense"
                fullWidth
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, m: 2 }}>
                <Button className={classes.siginbutton} style={{ width: "150px" }} onClick={handleSave}>
                  Save
                </Button>
                <Button className={classes.siginbutton} style={{ width: "150px" }} onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </Box>
            </>
          )}

      </Card>
    </>
  );
}

export default UserProfile;
