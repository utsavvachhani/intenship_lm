import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffWhonotVerified, approvestaffDeatils, rejectstaffDeatils } from '../../actions/staff';
import { toast } from 'react-toastify';
import {
  Card, CardContent, CardMedia, Typography, Button, Box, Grid, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { TextFiled, TextFiledScorall, TextFiledHorizontalScorall, TextFileMultiplesThings } from '../MultiChanges/CardComponents';
import { TableFiled, TableFiledScorall, TableFiledHorizontalScorall, TableFileMultiplesThings } from '../MultiChanges/TableComponents';
import VerificationBar from '../Navbar/VerificationBar';
import { useStyles } from '../../styles'
import CircularProgress from '@mui/material/CircularProgress';

const StaffVerify = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const staff = useSelector((state) => state.staff.unverified || []);
  const [view, setView] = useState('grid');
  const [isFetching, setFetching] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState({});

  useEffect(() => {
    const fetchStaff = async () => {
      setFetching(true);
      await dispatch(getStaffWhonotVerified());
      setFetching(false);
    };
    fetchStaff();
  }, [dispatch]);

  const handleApprove = async (id) => {
    setLoadingStatus((prev) => ({ ...prev, [id]: 'approve' }));
    const res = await dispatch(approvestaffDeatils(id));
    setLoadingStatus((prev) => ({ ...prev, [id]: null }));
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
    setLoadingStatus((prev) => ({ ...prev, [id]: 'reject' }));
    const res = await dispatch(rejectstaffDeatils(id));
    setLoadingStatus((prev) => ({ ...prev, [id]: null }));
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

  if (isFetching) return (
    <CircularProgress />
  );

  return (
    <>
      <VerificationBar
        title="Staff Verification"
        view={view}
        onGridView={() => setView('grid')}
        onTableView={() => setView('table')}
      />

      <Box padding={4} flexGrow={1} overflow="auto">
        {staff.length === 0 ? (
          <Typography variant="h6" align="center" className='font-color-thired' >
            No unverified Staff found.
          </Typography>
        ) : view === 'grid' ? (
          <Grid container spacing={3}>
            {staff.map((staffDeatils) => (
              <Grid item xs={12} sm={6} md={4} key={staffDeatils._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: "5px" }}>
                  <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 300,
                      },
                      height: {
                        xs: 'auto',
                        sm: 300,
                      },
                      objectFit: 'cover',
                    }}
                    image={staffDeatils.profilePic}
                    alt={staffDeatils.fullName}
                  />
                  <CardContent>
                    <TextFiled head="Full Name" details={staffDeatils.fullName} gutterBottom />
                    <TextFiledScorall head="Email" details={staffDeatils.email} variant="body2" showCopy={true} />
                    <TextFiledScorall head="Mobile" details={staffDeatils.mobile} variant="body2" showCopy={true} />
                    <TextFiledScorall head="Role" details={staffDeatils.role} variant="body2" />
                    <TextFiledHorizontalScorall head="Message" details={staffDeatils.messageReq} variant="body2" />
                    <TextFileMultiplesThings head="Issued By" details={staffDeatils.issuedBy} variant="body2"
                      subDeatils={{
                        "Name": "fullName",
                        "Email": "email",
                        "Action": "action",
                        "Issued At": "issuedAt",
                      }}
                    />
                  </CardContent>
                  <Stack direction="row" spacing={2} justifyContent="center" paddingBottom={2}>
                    <Button
                      variant="contained"
                      className={classes.successButton}
                      onClick={() => handleApprove(staffDeatils._id)}
                      disabled={!!loadingStatus[staffDeatils._id]}
                      startIcon={
                        loadingStatus[staffDeatils._id] === 'approve' ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : null
                      }
                    >
                      {loadingStatus[staffDeatils._id] === 'approve' ? 'Approving...' : 'Approve'}
                    </Button>
                    <Button
                      variant="outlined"
                      className={classes.rejectButton}
                      onClick={() => handleReject(staffDeatils._id)}
                      disabled={!!loadingStatus[staffDeatils._id]}
                      startIcon={
                        loadingStatus[staffDeatils._id] === 'reject' ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : null
                      }
                    >
                      {loadingStatus[staffDeatils._id] === 'reject' ? 'Rejecting...' : 'Reject'}
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table style={{ border: 'black 2px solid' }} >
              <TableHead style={{ borderBottom: 'black 2px solid' }}>
                <TableRow className='bg-amber-100 '>
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
                {staff.map((staffDeatils, index) => (
                  <TableRow key={staffDeatils._id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : '#f3e8dc', borderBottom: 'black 2px solid' }}>
                    <TableCell>
                      {staffDeatils.profilePic ? (
                        <img
                          src={staffDeatils.profilePic}
                          alt={staffDeatils.fullName}
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                        />
                      ) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <TableFiled details={staffDeatils.fullName} gutterBottom />
                    </TableCell>
                    <TableCell >
                      <TableFiledScorall details={staffDeatils.email} variant="body2" showCopy={true} />
                    </TableCell>
                    <TableCell>
                      <TableFiled details={staffDeatils.mobile} gutterBottom showCopy={true} />
                    </TableCell>
                    <TableCell>
                      <TableFiled details={staffDeatils.role} variant="body2" gutterBottom />
                    </TableCell>
                    <TableCell >
                      <TableFiledHorizontalScorall details={staffDeatils.messageReq} variant="body2" />
                    </TableCell>
                    <TableCell>
                      <TableFileMultiplesThings details={staffDeatils.issuedBy} variant="body2"
                        subDeatils={{
                          "Name": "fullName",
                          "Email": "email",
                          "Action": "action",
                          "Issued At": "issuedAt",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} justifyContent="center" paddingBottom={2}>
                        <Button
                          variant="contained"
                          className={classes.successButton}
                          onClick={() => handleApprove(staffDeatils._id)}
                          disabled={!!loadingStatus[staffDeatils._id]}
                          startIcon={
                            loadingStatus[staffDeatils._id] === 'approve' ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : null
                          }
                        >
                          {loadingStatus[staffDeatils._id] === 'approve' ? 'Approving...' : 'Approve'}
                        </Button>
                        <Button
                          variant="outlined"
                          className={classes.rejectButton}
                          onClick={() => handleReject(staffDeatils._id)}
                          disabled={!!loadingStatus[staffDeatils._id]}
                          startIcon={
                            loadingStatus[staffDeatils._id] === 'reject' ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : null
                          }
                        >
                          {loadingStatus[staffDeatils._id] === 'reject' ? 'Rejecting...' : 'Reject'}
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
