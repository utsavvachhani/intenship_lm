import React from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';

function VerificationBar({ title, view, onGridView, onTableView }) {
  return (
    <Box sx={{ padding: 2 }}>
      <div className="color-navbar font-color-navbar p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h1 className="ml-5 text-3xl font-semibold">{title}</h1>

        <div className="flex items-center mr-4 color-pepar rounded-3xl">
          <div
            onClick={onGridView}
            className={`rounded-l-3xl pr-5 cursor-pointer ${view === 'grid' ? 'color-secondary' : '' }`}
          >
            <Tooltip title="Grid View">
              <IconButton size="large">
                <GridViewIcon className={`${view === 'grid' ? 'font-color-sigin' : 'font-color-primary'}`} />
              </IconButton>
            </Tooltip>
          </div>

          <div
            onClick={onTableView}
            className={`rounded-r-3xl pl-5 cursor-pointer ${view === 'table' ? 'color-secondary' : '' }`}
          >
            <Tooltip title="Table View">
              <IconButton size="large">
                <TableRowsIcon className={`${view === 'table' ? 'font-color-sigin' : 'font-color-primary'}`} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default VerificationBar;
