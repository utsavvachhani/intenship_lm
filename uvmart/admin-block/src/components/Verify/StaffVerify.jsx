import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffWhonotVerified, approvestaffDeatils, rejectstaffDeatils } from '../../actions/staff';
import { toast } from 'react-toastify';
import {
  Card, CardContent, CardMedia, Typography, Button, Box, Grid, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import VerificationBar from '../Navbar/VerificationBar';
import { useStyles } from '../../styles'

const StaffVerify = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const staff = useSelector((state) => state.staff.unverified || []);
  const [view, setView] = useState('grid');

  useEffect(() => {
    dispatch(getStaffWhonotVerified());
  }, [dispatch]);

  const handleApprove = async (id) => {
    const res = await dispatch(approvestaffDeatils(id));
    if (res?.success) {
      toast.success(`${id} staff Approved ✅`, {
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
    const res = await dispatch(rejectstaffDeatils(id));
    if (res?.success) {
      toast.success(`${id} staff Rejected ❌`, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } else {
      toast.error(res?.message || 'error', {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <VerificationBar
        title="Staff Verification"
        onGridView={() => setView('grid')}
        onTableView={() => setView('table')}
      />

      <Box padding={4}>
        {staff.length === 0 ? (
          <Typography variant="h6" align="center">
            No unverified Staff found.
          </Typography>
        ) : view === 'grid' ? (
          <Grid container spacing={3}>
            {staff.map((staffDeatils) => (
              <Grid item xs={12} sm={6} md={4} key={staffDeatils._id}>
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
                    image={staffDeatils.profilePic}
                    alt={staffDeatils.fullName}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <strong>Full Name  </strong> : {staffDeatils.fullName}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Email  </strong> : {staffDeatils.email}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'block', mb: 1, }}  >
                      <strong>Mobile : </strong> {staffDeatils.mobile}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'block', mb: 1, }}  >
                      <strong>Role : </strong> {staffDeatils.role}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'block', mb: 1, }}  >
                      <strong>Message  : </strong> {staffDeatils.messageReq}
                    </Typography>

                    <Typography variant="body2" sx={{ display: 'block', mb: 1 }}>
                      <strong>Issued By:</strong>{' '}
                      {staffDeatils.issuedBy && staffDeatils.issuedBy.length > 0 && staffDeatils.issuedBy.at(-1).admin
                        ? `${staffDeatils.issuedBy.at(-1).admin.fullName} (${staffDeatils.issuedBy.at(-1).admin.email}) - ${staffDeatils.issuedBy.at(-1).action}`
                        : 'N/A'}
                    </Typography>
                  </CardContent>

                  <Stack direction="row" spacing={2} justifyContent="center" paddingBottom={2}>
                    <Button variant="contained" className={classes.successButton} onClick={() => handleApprove(staffDeatils._id)}>
                      Approve
                    </Button>
                    <Button variant="outlined" className={classes.rejectButton} onClick={() => handleReject(staffDeatils._id)}>
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
                  <TableCell><strong>Profile</strong></TableCell>
                  <TableCell><strong>Full Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Mobile</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Message</strong></TableCell>
                  <TableCell><strong>Issued By</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.map((staffDeatils) => (
                  <TableRow key={staffDeatils._id}>
                    <TableCell>
                      {staffDeatils.profilePic ? (
                        <img
                          src={staffDeatils.profilePic}
                          alt={staffDeatils.fullName}
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                        />
                      ) : 'N/A'}
                    </TableCell>
                    <TableCell>{staffDeatils.fullName}</TableCell>
                    <TableCell>{staffDeatils.email}</TableCell>
                    <TableCell>{staffDeatils.mobile}</TableCell>
                    <TableCell>{staffDeatils.role}</TableCell>
                    <TableCell>{staffDeatils.messageReq}</TableCell>
                    <TableCell>
                      {staffDeatils.issuedBy && staffDeatils.issuedBy.length > 0 && staffDeatils.issuedBy.at(-1).admin
                        ? `${staffDeatils.issuedBy.at(-1).admin.fullName} (${staffDeatils.issuedBy.at(-1).admin.email}) - ${staffDeatils.issuedBy.at(-1).action}`
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="contained"
                          className={classes.successButton}
                          onClick={() => handleApprove(staffDeatils._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          className={classes.rejectButton}
                          onClick={() => handleReject(staffDeatils._id)}
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

export default StaffVerify;
