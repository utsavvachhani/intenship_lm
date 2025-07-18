import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesByStaffId } from "../../actions/categories";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  TextFiled,
  TextItems,
  TextFiledHorizontalScorall,
  TextFileMultiplesThings,
  TextFiledRole,
} from "../MultiChanges/CardComponents";
import {
  TableFiled,
  TableItems,
  TableFiledHorizontalScorall,
  TableFileMultiplesThings,
  TableFiledRole,
} from "../MultiChanges/TableComponents";
import VerificationBar from "../Navbar/VerificationBar";
import CircularProgress from "@mui/material/CircularProgress";

function MyCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.userData || []);
  const user = useSelector((state) => state.auth.user);
  const { pagination } = useSelector((state) => state.categories);
  const [view, setView] = useState("grid");
  const [isFetching, setFetching] = useState(false);
  const [isVerified, setIsVerified] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const filters = [
    {
      label: "isVerified",
      value: isVerified,
      onChange: setIsVerified,
      options: [
        { label: "All", value: "all" },
        { label: "Verified", value: "true" },
        { label: "Not Verified", value: "false" },
      ],
    },
    {
      label: "Status",
      value: status,
      onChange: setStatus,
      options: [
        { label: "All", value: "all" },
        { label: "Approved", value: "Approved" },
        { label: "Pending", value: "Pending" },
        { label: "Rejected", value: "Rejected" },
      ],
    },
  ];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (user && user._id) {
        setFetching(true);
        dispatch(
          getCategoriesByStaffId({
            id: user._id,
            isVerified,
            status,
            searchQuery,
            page: currentPage,
            limit: postsPerPage,
          })
        ).finally(() => setFetching(false));
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [
    dispatch,
    user,
    isVerified,
    status,
    searchQuery,
    currentPage,
    postsPerPage,
  ]);

  if (!user || !user._id) {
    return <div>Loading user info...</div>;
  }

  return (
    <>
      <VerificationBar
        title="Categories Verification"
        view={view}
        onGridView={() => setView("grid")}
        onTableView={() => setView("table")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={postsPerPage}
        setPostsPerPage={setPostsPerPage}
        totalPages={pagination?.totalPages || 1}
      />
      {isFetching ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box padding={4} flexGrow={1} overflow="auto">
          {categories.length === 0 ? (
            <Typography
              variant="h6"
              align="center"
              className="font-color-thired"
            >
              {`No categories found with the current filters. Please try different filters or search criteria.`}
            </Typography>
          ) : view === "grid" ? (
            <Grid container spacing={3}>
              {categories.map((category) => (
                <Grid item xs={12} sm={6} md={4} key={category._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      padding: "5px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      width="300"
                      sx={{
                        width: {
                          xs: "100%",
                          sm: 300,
                        },
                        height: {
                          xs: "auto",
                          sm: 300,
                        },
                        objectFit: "cover",
                      }}
                      image={category.categoriesImage}
                      alt={category.categories}
                    />
                    <CardContent>
                      <TextFiled
                        head="Categore"
                        details={category.categories}
                        gutterBottom
                      />
                      <TextFiledHorizontalScorall
                        head="Descripton"
                        details={category.description}
                        variant="body2"
                      />
                      <TextFiledRole head="Status" details={category.status} />
                      <TextFileMultiplesThings
                        head="Issued By"
                        details={category.issuedBy}
                        variant="body2"
                        subDeatils={{
                          Name: "fullName",
                          Email: "email",
                          Action: "action",
                          "Issued At": "issuedAt",
                        }}
                      />

                      <TextItems
                        head="Parent Category"
                        variant="body2"
                        details={category.parentCategories}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <TableContainer component={Paper}>
              <Table style={{ border: "black 2px solid" }}>
                <TableHead style={{ borderBottom: "black 2px solid" }}>
                  <TableRow className="bg-amber-100 ">
                    <TableCell>
                      <strong>Category</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Description</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Issued By</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Parent</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Image</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow
                      key={category._id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "white" : "#f3e8dc",
                        borderBottom: "black 2px solid",
                      }}
                    >
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <TableFiled
                          details={category.categories}
                          gutterBottom
                        />
                      </TableCell>

                      <TableCell>
                        <TableFiledHorizontalScorall
                          details={category.description}
                          variant="body2"
                        />
                      </TableCell>

                      <TableCell>
                        <TableFiledRole details={category.status} />
                      </TableCell>

                      <TableCell>
                        <TableFileMultiplesThings
                          details={category.issuedBy}
                          variant="body2"
                          subDeatils={{
                            Name: "fullName",
                            Email: "email",
                            Action: "action",
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
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 4,
                            }}
                          />
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}
    </>
  );
}

export default MyCategories;
