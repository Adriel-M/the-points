import fileDownload from 'js-file-download';
import { print } from 'graphql/language/printer';
import { parse } from 'json2csv';

import { GET_PLAYERS } from './queryPlayers';

const CSV_OPTS = {
  fields: [
    {
      label: 'Player',
      value: 'name',
    },
    {
      label: 'Team',
      value: 'team',
    },
    {
      label: 'Pos',
      value: 'position',
    },
    {
      label: 'Att',
      value: 'attempts',
    },
    {
      label: 'Att/G',
      value: 'attemptsPerGame',
    },
    {
      label: 'Yds',
      value: 'yards',
    },
    {
      label: 'Avg',
      value: 'average',
    },
    {
      label: 'Yds/G',
      value: 'yardsPerGame',
    },
    {
      label: 'TD',
      value: 'touchDown',
    },
    {
      label: 'Lng',
      value: 'longGain',
    },
    {
      label: '1st',
      value: 'first',
    },
    {
      label: '1st%',
      value: 'firstPercentage',
    },
    {
      label: '20+',
      value: 'twentyPlus',
    },
    {
      label: '40+',
      value: 'fourtyPlus',
    },
    {
      label: 'FUM',
      value: 'fumbles',
    },
  ],
};

const downloadPlayers = async (filter, sortBy) => {
  const response = await fetch('./api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(GET_PLAYERS),
      variables: {
        filter,
        sortBy,
      },
    }),
  });
  const asJson = await response.json();
  const { players } = asJson.data.getPlayers;
  const csv = parse(players, CSV_OPTS);
  fileDownload(csv, 'rushing.csv');
};

export default downloadPlayers;
