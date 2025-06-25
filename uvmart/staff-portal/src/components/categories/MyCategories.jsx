import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesByStaffId } from '../../actions/categories';
import {
  Card, CardContent, CardMedia, Typography, Box, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { TextFiled, TextItems, TextFiledHorizontalScorall, TextFileMultiplesThings, TextFiledRole } from '../MultiChanges/CardComponents';
import { TableFiled, TableItems, TableFiledHorizontalScorall, TableFileMultiplesThings, TableFiledRole } from '../MultiChanges/TableComponents';
import VerificationBar from '../Navbar/VerificationBar';
import CircularProgress from '@mui/material/CircularProgress';

function MyCategories() {
  const dispatch = useDispatch();
  const [view, setView] = useState('grid');
  const [isFetching, setFetching] = useState(false);
  const categories = useSelector((state) => state.categories.userData || []);
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        setFetching(true);
        await dispatch(getCategoriesByStaffId({ id: user._id }));
        setFetching(false);
      }
    };

    fetchData();
  }, [dispatch, user]);
  if (!user || !user._id) {
    return <div>Loading user info...</div>;
  }

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <VerificationBar
        title="Staff Verification"
        view={view}
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
                    image={category.categoriesImage}
                    alt={category.categories}
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
                  />
                  <CardContent>
                    <TextFiled head="Categore" details={category.categories} gutterBottom />
                    <TextFiledHorizontalScorall head="Descripton" details={category.description} variant="body2" />
                    <TextFiledRole head="Status" details={category.status} />
                    <TextFileMultiplesThings head="Issued By" details={category.issuedBy} variant="body2"
                      subDeatils={{
                        "Name": "fullName",
                        "Email": "email",
                        "Action": "action",
                        "Issued At": "issuedAt",
                      }}
                    />
                    <TextItems head="Parent Category" variant="body2" details={category.parentCategories} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{}} style={{ border: 'black 2px solid' }} >
              <TableHead style={{ borderBottom: 'black 2px solid' }} >
                <TableRow className='bg-amber-100 ' >
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Parent</strong></TableCell>
                  <TableCell><strong>Image</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category,index) => (
                  <TableRow key={category._id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : '#f3e8dc', borderBottom: 'black 2px solid' }}>
                    <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      <TableFiled details={category.categories} gutterBottom />
                    </TableCell>

                    <TableCell>
                      <TableFiledHorizontalScorall details={category.description} variant="body2" />
                    </TableCell>

                    <TableCell>
                      <TableFiledRole details={category.status} />
                    </TableCell>

                    <TableCell>
                      <TableFileMultiplesThings details={category.issuedBy} variant="body2"
                        subDeatils={{
                          "Name": "fullName",
                          "Email": "email",
                          "Action": "action",
                          "Issued At": "issuedAt",
                        }}
                      />

                    </TableCell>
                    <TableCell>
                      <TableItems details={category.parentCategories} />
                    </TableCell>

                    <TableCell>
                      {category.categoriesImage ? (
                        <img
                          src={category.categoriesImage}
                          alt={category.categories}
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                        />
                      ) : 'N/A'}
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
}

export default MyCategories;
