import { makeStyles } from '@mui/styles';

// Shared button styles
const sharedButton = (theme) => ({
  backgroundColor: `${theme.palette.custom.button.background} !important`,
  border: `2px solid ${theme.palette.custom.button.border} !important`,
  color: `${theme.palette.custom.button.text} !important`,
  '&:hover': {
    backgroundColor: `${theme.palette.custom.button.hover} !important`,
    color: `${theme.palette.custom.button.hoverText} !important`,
    fontWeight: 'bold !important',
  },
  '&.Mui-disabled': {
    backgroundColor: `${theme.palette.custom.button.disableBaground} !important`,
    color: `${theme.palette.custom.button.disabledText} !important`,
    border: `2px solid ${theme.palette.custom.button.disabledBorder} !important`,
    cursor: 'not-allowed',
  },
});

export const useStyles = makeStyles((theme) => ({
  ButtonUI: {
    ...sharedButton(theme),
    width: '100%',
    gap: 15,
  },
  searchButton: {
    fontFamily: 'monospace',
    borderRadius: '25% !important',
    '&:hover': {
      color: `${theme.palette.custom.button.hoverText} !important`,
      fontWeight: 'bold !important',
    },
  },
  avatar: {
    backgroundColor: `${theme.palette.custom.colors.avatarBackground} !important`,
    color: `${theme.palette.custom.colors.avatar} !important`
  },
  manuNavbar: {
    backgroundColor: 'transperent !important',
  },

  input: {
    boxSizing: 'border-box',
    paddingRight: 0,
    margin: '5px !important',
    color: theme.palette.primary.main,
  },

  siginbutton: {
    ...sharedButton(theme),
    marginBottom: "10px !important",
  },
  selectMenu: {
    color: 'black !important', // text color for selected option & input
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black !important',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black !important',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black !important',
    },
    // Style for the dropdown icon color (optional)
    '& .MuiSelect-icon': {
      color: 'black !important',
    },
    // To ensure placeholder/input label color is black !important
    '& .MuiInputLabel-root': {
      color: 'black !important',
    },
  },
  menuItem: {
    color: 'black',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      borderLeft: "2px bold !important"
    },
    '&.Mui-selected': {
      backgroundColor: '#cfcfcf',
      '&:hover': {
        backgroundColor: '#b0b0b0',
      },
    },
  },

  header: {
    backgroundColor: `${theme.palette.custom.header.background} !important`,
    width: '100%',
    height: '100%'
  },

  successButton: {
    backgroundColor: `${theme.palette.custom.button.successBG} !important`,
    color: `${theme.palette.custom.button.hoverText} !important`,
    fontWeight: `bold !important`,
    border: `${theme.palette.custom.button.hoverText} 2px solid !important`,
    '&:hover': {
      backgroundColor: `${theme.palette.custom.button.hoverText} !important`,
      color: `${theme.palette.custom.button.successBG} !important`,
      border: `${theme.palette.custom.button.successBG} 2px solid !important`,
      fontWeight: 'bold !important',
    },
    '&.Mui-disabled': {
      backgroundColor: `${theme.palette.custom.button.disableBaground} !important`,
      color: `${theme.palette.custom.button.disabledText} !important`,
      border: `2px solid ${theme.palette.custom.button.disabledBorder} !important`,
      cursor: 'not-allowed',
    },
  },
  rejectButton: {
    color: `${theme.palette.custom.button.hoverText} !important`,
    fontWeight: `bold !important`,
    border: `${theme.palette.custom.button.hoverText} 2px solid !important`,
    '&:hover': {
      color: `${theme.palette.custom.button.rejectedBG} !important`,
      border: `${theme.palette.custom.button.rejectedBG} 2px solid !important`,
      fontWeight: 'bold !important',
    },
    '&.Mui-disabled': {
      color: `${theme.palette.custom.button.disabledText} !important`,
      border: `2px solid ${theme.palette.custom.button.disabledBorder} !important`,
      cursor: 'not-allowed',
    },
  },
}))