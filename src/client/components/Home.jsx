import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

import TopBar from './TopBar';
import PlayerTable from './PlayerTable';

import { DEFAULT_SORT_BY } from '../sharedClient';
import queryPlayers from '../queryPlayers';
import downloadPlayers from '../downloadPlayers';

const Home = () => {
  const [filter, setFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);

  useEffect(() => {
    const debounced = debounce(() => {
      setFilter(searchText);
      setOffset(0);
    }, 100);
    debounced();
    return debounced.cancel;
  }, [searchText]);

  useEffect(() => {
    setOffset(0);
  }, [sortBy]);

  const downloadFn = () => {
    downloadPlayers(filter, sortBy);
  };

  const reset = () => {
    setFilter('');
    setSearchText('');
    setOffset(0);
    setSortBy(DEFAULT_SORT_BY);
  };

  const { loading, error, data } = queryPlayers({
    filter,
    offset,
    limit,
    sortBy,
  });

  let players = [];
  let totalCount = 0;
  let suggestions = [];

  if (data && data.getPlayers) {
    players = data.getPlayers.players;
    totalCount = data.getPlayers.totalCount;
    suggestions = data.getPlayers.suggestions;
  }

  return (
    <>
      <TopBar
        searchText={searchText}
        setSearchText={setSearchText}
        suggestions={suggestions}
        sortBy={sortBy}
        setSortBy={setSortBy}
        downloadFn={downloadFn}
        reset={reset}
      />
      <PlayerTable
        players={players}
        totalCount={totalCount}
        limit={limit}
        setLimit={setLimit}
        offset={offset}
        setOffset={setOffset}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default Home;
