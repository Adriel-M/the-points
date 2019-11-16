const _ = require('lodash');

const RushingStore = require('../RushingStore');
const { sortableProperties } = require('../../shared');

const getSortedFilteredResults = (filteredResults, sortBy) => {
  if (!sortBy) {
    return filteredResults;
  }

  const sortableKeys = Object.keys(sortableProperties);
  const sortOn = sortableKeys.find((sortKey) => sortBy.startsWith(sortKey));
  const sorted = _.sortBy(filteredResults, sortOn);

  if (sortBy.endsWith('Asc')) {
    return sorted;
  }
  return _.reverse(sorted);
};

const playersResolve = (parent, {
  filter = '', offset = 0, limit = RushingStore.size, sortBy = '',
}) => {
  const filteredResults = RushingStore.fetch(filter.toLowerCase());
  const sortedFilteredResults = getSortedFilteredResults(filteredResults, sortBy);
  const endIndex = offset + limit;

  const suggestions = filteredResults
    .map((player) => player.name)
    .filter((name) => name !== filter);
  suggestions.sort();

  return {
    players: sortedFilteredResults.slice(offset, endIndex),
    totalCount: sortedFilteredResults.length,
    suggestions: suggestions.slice(0, 10),
  };
};

module.exports = playersResolve;
