import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesWhonotVerified, approveCategory, rejectCategory } from '../../actions/categories';
import { toast } from 'react-toastify';
import {
  Card, CardContent, CardMedia, Typography, Button, Box, Grid, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import VerificationBar from '../Navbar/VerificationBar';
import { useStyles } from '../../styles'

const CategoriesVerify = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const categories = useSelector((state) => state.categories.unverified || []);
  const [view, setView] = useState('grid');

  useEffect(() => {
    dispatch(getCategoriesWhonotVerified());
  }, [dispatch]);

  const handleApprove = async (id) => {
    const res = await dispatch(approveCategory(id));
    if (res?.success) {
      toast.success(`${id} categories Approved ✅`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } else {
      toast.error(res?.message || 'Issued', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  const handleReject = async (id) => {
    const res = await dispatch(rejectCategory(id));
    if (res?.success) {
      toast.success(`${id} categories Rejected ❌`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } else {
      toast.error(res?.message || 'Signup failed', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <VerificationBar
        title="Categories Verification"
        onGridView={() => setView('grid')}
        onTableView={() => setView('table')}
      />

      <Box padding={4} flexGrow={1} overflow="auto">
        {categories.length === 0 ? (
          <Typography variant="h6" align="center">
            No unverified categories found.
          </Typography>
        ) : view === 'grid' ? (
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: "5px" }}>
                  <CardMedia
                    component="img"
                    height="250"
                    width="250"
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 250,
                      },
                      height: {
                        xs: 'auto',
                        sm: 250,
                      },
                      objectFit: 'cover',
                    }}
                    image={category.categoriesImage}
                    alt={category.categories}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <strong>Categore  </strong> : {category.categories}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, maxWidth: 200, overflowX: 'auto', whiteSpace: 'nowrap', display: 'block' }}>
                      <strong>Descripton  </strong> :
                      <div
                        style={{
                          maxWidth: 300, maxHeight: 80,
                          overflow: 'hidden', textOverflow: 'ellipsis',
                          whiteSpace: 'normal', paddingTop: 4,
                          border: '1px solid #ccc', padding: '4px 8px',
                        }}
                      >
                        {category.description}
                      </div>
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'block', mb: 1, }}  >
                      <strong>Status:</strong> {category.status}
                    </Typography>

                    <Typography variant="body2" sx={{ display: 'block', mb: 1, }} >
                      {category.issuedBy && category.issuedBy.length > 0 ? (
                        <div style={{ maxHeight: 200, overflowY: 'auto', paddingLeft: 16 }}>
                          {category.issuedBy.map((issue, index) => (
                            <div key={index} className="list-item" style={{ marginBottom: 12, borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
                              <div><strong>Name:</strong> {issue.admin?.fullName || 'N/A'}</div>
                              <div><strong>Email:</strong> {issue.admin?.email || 'N/A'}</div>
                              <div><strong>Action:</strong> {issue.action || 'N/A'}</div>
                              <div><small>Issued At: {new Date(issue.issuedAt).toLocaleString()}</small></div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </Typography>

                    <Typography variant="body2" sx={{ display: 'block', mb: 1 }}>
                      <strong>Requested By:</strong><br />
                      {category.users && category.users.length > 0 ? (
                        <div style={{ maxHeight: 200, overflowY: 'auto', paddingLeft: 16 }}>
                          {category.users.map((request, index) => (
                            <div
                              key={index}
                              className="list-item"
                              style={{
                                marginBottom: 12,
                                borderBottom: '1px solid #ccc',
                                paddingBottom: 8,
                              }}
                            >
                              <div><strong>Name:</strong> {request.fullName || 'N/A'}</div>
                              <div><strong>Email:</strong> {request.email || 'N/A'}</div>
                              <div><strong>Role:</strong> {request.role || 'N/A'}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </Typography>



                    <Typography variant="body2" sx={{ display: 'block', mb: 1, }}  >
                      <strong>Parent Category : </strong>
                      {category.parentCategories && category.parentCategories.length > 0 ? (
                        <>
                          {category.parentCategories.map((parent) => (
                            <div
                              style={{
                                maxWidth: 300, maxHeight: 80,
                                overflow: 'hidden', textOverflow: 'ellipsis',
                                whiteSpace: 'normal', paddingTop: 4,
                                border: '1px solid #ccc', padding: '4px 8px',
                              }}
                            >
                              {parent.categories}
                              <br />
                            </div>
                          ))}
                        </>
                      ) : (
                        'N/A'
                      )}
                    </Typography>
                  </CardContent>

                  <Stack direction="row" spacing={2} justifyContent="center" paddingBottom={2}>
                    <Button variant="contained" className={classes.successButton} onClick={() => handleApprove(category._id)}>
                      Approve
                    </Button>
                    <Button variant="outlined" className={classes.rejectButton} onClick={() => handleReject(category._id)}>
                      Reject
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Issued By</strong></TableCell>
                  <TableCell><strong>Created By</strong></TableCell>
                  <TableCell><strong>Parent</strong></TableCell>
                  <TableCell><strong>Image</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={category._id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : '#f3e8dc' }}>
                    {/* Category Name */}
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {category.categories}
                    </TableCell>

                    {/* Description */}
                    <TableCell>
                      <div style={{
                        maxWidth: 200,
                        maxHeight: 80,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        paddingTop: 4
                      }}>
                        {category.description}
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>{category.status}</TableCell>

                    {/* Issued By */}
                    <TableCell>
                      {category.issuedBy && category.issuedBy.length > 0 ? (
                        <div style={{ maxHeight: 200, overflowY: 'auto', paddingLeft: 16 }}>
                          {category.issuedBy.map((issue, index) => (
                            <div key={index} className="list-item" style={{ marginBottom: 12, borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
                              <div><strong>Name:</strong> {issue.admin?.fullName || 'N/A'}</div>
                              <div><strong>Email:</strong> {issue.admin?.email || 'N/A'}</div>
                              <div><strong>Action:</strong> {issue.action || 'N/A'}</div>
                              <div><small>Issued At: {new Date(issue.issuedAt).toLocaleString()}</small></div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>

                    {/* Requested By */}
                    <TableCell>
                      {category.users && category.users.length > 0 ? (
                        <div style={{ maxHeight: 200, overflowY: 'auto', paddingLeft: 16 }}>
                          {category.users.map((request, index) => (
                            <div
                              key={index}
                              className="list-item"
                              style={{
                                marginBottom: 12,
                                borderBottom: '1px solid #ccc',
                                paddingBottom: 8,
                              }}
                            >
                              <div><strong>Name:</strong> {request.fullName || 'N/A'}</div>
                              <div><strong>Email:</strong> {request.email || 'N/A'}</div>
                              <div><strong>Role:</strong> {request.role || 'N/A'}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>

                    {/* Parent Categories */}
                    <TableCell>
                      {category.parentCategories?.length > 0 ? (
                        <div style={{ maxHeight: 80, overflowY: 'auto' }}>
                          {category.parentCategories.map((parent, i) => (
                            <div key={i} className="m-3" >{parent.categories}</div>
                          ))}
                        </div>
                      ) : 'N/A'}
                    </TableCell>

                    {/* Image */}
                    <TableCell>
                      {category.categoriesImage ? (
                        <img
                          src={category.categoriesImage}
                          alt={category.categories}
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                        />
                      ) : 'N/A'}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="contained"
                          className={classes.successButton}
                          onClick={() => handleApprove(category._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          className={classes.rejectButton}
                          onClick={() => handleReject(category._id)}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default CategoriesVerify;
