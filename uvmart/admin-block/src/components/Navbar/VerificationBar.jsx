import React from 'react';
import { Box, Button, Tooltip, IconButton } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';

function VerificationBar({title, onGridView, onTableView }) {
  return (
    <Box sx={{ padding: 2 }}>
      <div className="color-navbar font-color-navbar p-4 rounded-2xl flex justify-between items-center shadow-md">
        <h1 className="ml-5 text-3xl font-semibold">{title}</h1>
        
        <div className="flex items-center gap-4 mr-6">
          <Tooltip title="Grid View">
            <IconButton onClick={onGridView} size="large">
              <GridViewIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Table View">
            <IconButton onClick={onTableView} size="large">
              <TableRowsIcon style={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Box>
  );
}

export default VerificationBar;
