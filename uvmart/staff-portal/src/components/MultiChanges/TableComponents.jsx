import React, { useState } from 'react';
import { Typography, Snackbar, Box, Slide, Chip} from '@mui/material';
export const CopyFiled = ({
  details,
  variant = "h6",
  gutterBottom = false,
  sx = {}
}) => {
  const [open, setOpen] = useState(false);
  const TransitionRight = (props) => {
    return <Slide {...props} direction="left" />;
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(details);
    setOpen(true);
    setTimeout(() => setOpen(false), 1500);
  };
  return (
    <>
      <Typography
        variant={variant}
        gutterBottom={gutterBottom}
        onClick={handleCopy}
        className="font-color-pepar"

        sx={{
          cursor: 'pointer',
          userSelect: 'none',
          ...sx,
        }}
      >
        {details}
      </Typography>

      <Snackbar
        open={open}
        message="Copied!"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={TransitionRight}
        TransitionProps={{
          timeout: {
            enter: 700,
            exit: 500
          }
        }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: "#0000096",
            color: 'white',
            border: 'white 2px solid',
          },
        }}
      />


    </>
  );
};


export const TableFiled = ({
  variant = "h6",
  details,
  gutterBottom = false,
  sx,
  showCopy = false,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {showCopy ? (
          <CopyFiled details={details} gutterBottom={gutterBottom} />
        ) : (
          <Typography variant={variant} gutterBottom={gutterBottom}>
            {details}
          </Typography>
        )}
      </Box>
    </Box>
  );
};


export const TableFiledRole = ({
  variant = "body2",
  details,
  sx,
}) => {
  const getStatusClass = (action) => {
    const lower = action?.toLowerCase();
    if (lower === "approved") return "approved-text";
    if (lower === "rejected") return "rejected-text";
    return "panding-text";
  };
  const statusClass = getStatusClass(details);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography variant={variant} className={statusClass}>
          {details}
        </Typography>
      </Box>
    </Box>
  );
};

export const TableFiledScorall = ({
  variant = "h6",
  details,
  gutterBottom = false,
  sx = { maxWidth: 100, overflowX: 'auto', whiteSpace: 'nowrap', display: 'block' },
  showCopy = false,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {showCopy ? (
          <CopyFiled details={details} gutterBottom={gutterBottom} variant={variant} sx={sx} />
        ) : (
          <Typography variant={variant} sx={sx} gutterBottom={gutterBottom} >
            {details}
          </Typography>
        )}
      </Box>
    </Box>
  );
};


export const TableFiledHorizontalScorall = ({
  variant = "h6",
  details,
  gutterBottom = false,
  textBoxSx = {
    maxWidth: 250,
    maxHeight: 250,
    overflow: 'auto',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-wrap',
    paddingTop: 1,
    border: '1px solid #ccc',
    padding: '4px 8px',
    borderRadius: '4px',
  },
}) => {
  return (
    <Box sx={{ display: 'grid', alignItems: 'flex-start', mb: 2 }}>
      <Box sx={{ display: 'grid', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        {details ? (
          <Box sx={textBoxSx}>
            <Typography
              variant={variant}
              gutterBottom={gutterBottom}
              sx={{ m: 0 }} // remove inner margin
            >
              {details}
            </Typography>
          </Box>
        ) : (
          <Typography variant={variant} gutterBottom={gutterBottom}>
            NA
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export const TableFileMultiplesThings = ({
  details = [],
  variant = "body2",
  subDeatils = {},
}) => {
  const getStatusClass = (action) => {
    const lower = action?.toLowerCase();
    if (lower === "approved") return "approved-text";
    if (lower === "rejected") return "rejected-text";
    return "panding-text"; // for pending or any other
  };

  return (
    <Box sx={{ mb: 2 }}>
      {details.length > 0 ? (
        <Box
          sx={{
            maxHeight: 150,
            overflowY: 'auto',
            pl: 2,
            pr: 1,
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 1,
          }}
        >
          {details.map((item, index) => (
            <Box key={index} sx={{ mb: 1.5 }} style={{ marginBottom: 12, borderBottom: '1px solid #ccc', paddingBottom: 8 }} >
              {Object.entries(subDeatils).map(([label, key]) => {
                let value;

                if (key === 'issuedAt' && item[key]) {
                  value = new Date(item[key]).toLocaleString();
                } else {
                  if (key.includes('.')) {
                    const keys = key.split('.');
                    value = keys.reduce((acc, k) => acc?.[k], item);
                  } else {
                    value = item[key] || item.admin?.[key];
                  }

                  value = value || 'N/A';
                }

                if (label.toLowerCase() === "action" && value !== 'N/A') {
                  const statusClass = getStatusClass(value);
                  return (
                    <Box
                      key={key}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}
                    >
                      <Typography variant={variant} sx={{ fontWeight: 'bold' }}>
                        {label}:
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant={variant} className={statusClass}>
                          {value}
                        </Typography>
                      </Box>
                    </Box>
                  );
                }
                return (
                  <Typography key={key} variant={variant}>
                    <strong>{label}:</strong> {value}
                  </Typography>
                );
              })}

            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant={variant}>N/A</Typography>
      )}
    </Box>
  );
};


export const TableItems = ({
  details,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1 }}>
            {details && details.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {details.map((item, index) => (
            <Chip
              key={index}
              label={item.categories || 'N/A'}
              variant="outlined"
              color="primary"
              sx={{ fontSize: 14 }}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="body2" color="black">N/A</Typography>
      )}
    </Box>
  );
};