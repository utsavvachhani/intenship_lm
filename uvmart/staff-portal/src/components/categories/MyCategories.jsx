import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesByStaffId } from '../../actions/categories';
import {
  Card, CardContent, CardMedia, Typography, Box, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
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
                    <Typography variant="h6" gutterBottom>
                      <strong>Category:</strong> {category.categories}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ mb: 1, maxWidth: 200, overflowX: 'auto', whiteSpace: 'nowrap', display: 'block' }}>
                      <strong>Description:</strong>
                      <div style={{
                        maxWidth: 300, maxHeight: 80,
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        whiteSpace: 'normal', paddingTop: 4,
                        border: '1px solid #ccc', padding: '4px 8px',
                      }}>
                        {category.description}
                      </div>
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Status:</strong> {category.status}
                    </Typography>
                    <Typography variant="body2" component="div">
                      <strong>Parent Category:</strong>
                      {category.parentCategories?.length > 0 ? (
                        category.parentCategories.map((parent, i) => (
                          <div key={i} style={{
                            maxHeight: 80,
                            overflow: 'hidden',
                            padding: '4px 8px',
                            border: '1px solid #ccc',
                            marginTop: 4
                          }}>
                            {parent.categories}
                          </div>
                        ))
                      ) : ' N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell ><strong>Category</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Parent</strong></TableCell>
                  <TableCell><strong>Image</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow
                    key={category._id}
                  >
                    <TableCell>{category.categories}</TableCell>
                    <TableCell>
                      <div style={{
                        maxHeight: 80,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal'
                      }}>
                        {category.description}
                      </div>
                    </TableCell>
                    <TableCell>{category.status}</TableCell>
                    <TableCell>
                      {category.parentCategories?.length > 0 ? (
                        category.parentCategories.map((parent, i) => (
                          <div key={i}>{parent.categories}</div>
                        ))
                      ) : 'N/A'}
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
