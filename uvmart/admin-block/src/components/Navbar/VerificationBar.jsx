import React from 'react';
import {
  Box,
  Tooltip,
  IconButton,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useStyles } from '../../styles.js';

const VerificationBar = ({
  title = '',
  view,
  onGridView,
  onTableView,
  searchQuery,
  setSearchQuery,
  filters = [],
  currentPage = 1,
  setCurrentPage = () => { },
  postsPerPage = 10,
  setPostsPerPage = () => { },
  totalPages = 1,
}) => {
  const classes = useStyles();

  const handleResetFilters = () => {
    setSearchQuery('');
    filters.forEach((filter) => {
      const defaultValue = filter.options?.[0]?.value ?? '';
      filter.onChange(defaultValue);
    });
    setCurrentPage(1);
  };

  const formControlSx = {
    minWidth: 140,
    '& .MuiInputLabel-root': {
      color: 'white',
      '&.Mui-focused': {
        color: 'white',
      },
    },
    '& .MuiOutlinedInput-root': {
      color: 'white',
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  };

  const selectSx = {
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  };

  const menuItemSx = {
    gap: 2,
    pl: 2,
    transition: 'border-left 0.2s ease',
    ":hover": {
      borderLeft: "6px solid black",
    },
  };

  return (
    <Box sx={{ padding: 2 }}>
      <div className="color-navbar font-color-navbar p-4 rounded-2xl gap-4 flex flex-col justify-between">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="flex items-center mr-4 color-pepar rounded-3xl">
            <div
              onClick={onGridView}
              className={`rounded-l-3xl pr-5 cursor-pointer ${view === 'grid' ? 'color-secondary' : ''}`}
            >
              <Tooltip title="Grid View">
                <IconButton size="large">
                  <GridViewIcon className={`${view === 'grid' ? 'font-color-sigin' : 'font-color-primary'}`} />
                </IconButton>
              </Tooltip>
            </div>

            <div
              onClick={onTableView}
              className={`rounded-r-3xl pl-5 cursor-pointer ${view === 'table' ? 'color-secondary' : ''}`}
            >
              <Tooltip title="Table View">
                <IconButton size="large">
                  <TableRowsIcon className={`${view === 'table' ? 'font-color-sigin' : 'font-color-primary'}`} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Filters & Controls */}

        <div className="flex flex-wrap justify-start md:justify-center items-center mt-4 gap-4">
          {/* Previous Button */}
          <div>
            <Button
              className={classes.ButtonUI}
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <KeyboardArrowLeftIcon />
            </Button>
          </div>

          {/* Search */}
          <TextField
            size="small"
            label="Search Category"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={formControlSx}
          />

          {/* Dynamic Filters */}
          {filters.map((filter, idx) => (
            <FormControl key={idx} size="small" sx={formControlSx}>
              <InputLabel>{filter.label}</InputLabel>
              <Select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                label={filter.label}
                sx={selectSx}
              >
                {filter.options.map((option, i) => (
                  <MenuItem key={i} value={option.value} sx={menuItemSx}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}

          {/* Reset Button */}
          <div>

            <Button variant="contained" className={classes.ButtonUI} onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>

          {/* Posts Per Page */}
          <FormControl size="small" sx={formControlSx}>
            <InputLabel>Posts/Page</InputLabel>
            <Select
              value={postsPerPage}
              onChange={(e) => setPostsPerPage(+e.target.value)}
              label="Posts/Page"
              sx={selectSx}
            >
              {[5, 10, 15, 20].map((count) => (
                <MenuItem key={count} value={count} sx={menuItemSx}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Next Button */}
          <div>
            <Button
              className={classes.ButtonUI}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <KeyboardArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default VerificationBar;
