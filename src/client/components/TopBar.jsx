import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { SORT_BY, DEFAULT_SORT_BY, noop } from '../sharedClient';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  formControl: {
    margin: theme.spacing(1, 1, 1, 1),
    minWidth: 120,
  },
  select: {
    color: theme.palette.common.white,
  },
}));

const TopBar = (props) => {
  const classes = useStyles();
  const {
    searchText, setSearchText, suggestions, sortBy, setSortBy, downloadFn, reset,
  } = props;

  const handleAutoCompleteChange = (_, newValue) => {
    const newText = newValue || '';
    setSearchText(newText);
  };
  const handleTextInputChange = (e) => {
    const newText = e.target.value || '';
    setSearchText(newText);
  };

  const renderSearch = () => (
    <Autocomplete
      options={suggestions}
      style={{ width: 300 }}
      value={searchText}
      onChange={handleAutoCompleteChange}
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          color="secondary"
          fullWidth
          onChange={handleTextInputChange}
        />
      )}
    />
  );

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSelectChange = (e) => {
    setSortBy(e.target.value);
  };

  const renderSort = () => (
    <FormControl className={classes.formControl}>
      <Select
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={sortBy}
        onChange={handleSelectChange}
        classes={{
          select: classes.select,
        }}
      >
        {Object.keys(SORT_BY).map((sortKey) => (
          <MenuItem key={sortKey} value={sortKey}>{SORT_BY[sortKey]}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={reset} className={classes.title} variant="h6" noWrap>
            The Points
          </Typography>
          {renderSort()}
          <div className={classes.search}>
            {renderSearch()}
          </div>
          <Button color="inherit" onClick={downloadFn}>Download</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

TopBar.defaultProps = {
  searchText: '',
  setSearchText: noop,
  suggestions: [],
  sortBy: DEFAULT_SORT_BY,
  setSortBy: noop,
  downloadFn: noop,
  reset: noop,
};

TopBar.propTypes = {
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  sortBy: PropTypes.string,
  setSortBy: PropTypes.func,
  downloadFn: PropTypes.func,
  reset: PropTypes.func,
};

export default TopBar;
