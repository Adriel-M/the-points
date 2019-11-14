import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import { PlayerType, noop } from '../sharedClient';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

const ORDER = [
  'Player',
  'Team',
  'Pos',
  'Att',
  'Att/G',
  'Yds',
  'Avg',
  'Yds/G',
  'TD',
  'Lng',
  '1st',
  '1st%',
  '20+',
  '40+',
  'FUM',
];

const DATA_MAPPING = {
  Player: 'name',
  Team: 'team',
  Pos: 'position',
  Att: 'attempts',
  'Att/G': 'attemptsPerGame',
  Avg: 'average',
  Yds: 'yards',
  'Yds/G': 'yardsPerGame',
  TD: 'touchDown',
  Lng: 'longGain',
  '1st': 'first',
  '1st%': 'firstPercentage',
  '20+': 'twentyPlus',
  '40+': 'fourtyPlus',
  FUM: 'fumbles',
};

const PlayerTable = (props) => {
  const classes = useStyles();
  const {
 players, totalCount, limit, setLimit, offset, setOffset 
} = props;

  const handleChangeRowsPerPage = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setOffset(0);
  };

  const handleChangePage = (_, newPage) => {
    setOffset(newPage * limit);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader className={classes.table} aria-label="Player Table">
          <TableHead>
            <TableRow>
              {ORDER.map((colName) => (
                <TableCell key={`header=${colName}`}>{colName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow key={player.name}>
                {ORDER.map((colName) => (
                  <TableCell key={`${player.name}-${colName}`}>
                    {player[DATA_MAPPING[colName]]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                colSpan={3}
                count={totalCount}
                rowsPerPage={limit}
                page={Math.floor(offset / limit)}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
};

PlayerTable.defaultProps = {
  players: [],
  totalCount: 0,
  limit: 0,
  setLimit: noop,
  offset: 0,
  setOffset: noop,
};

PlayerTable.propTypes = {
  players: PropTypes.arrayOf(PlayerType),
  totalCount: PropTypes.number,
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  offset: PropTypes.number,
  setOffset: PropTypes.func,
};

export default PlayerTable;
