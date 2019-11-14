import PropTypes from 'prop-types';

import { sortableProperties } from '../shared';

export const noop = () => {};

export const SORT_BY = {};
const sortableKeys = Object.keys(sortableProperties);
for (let i = 0; i < sortableKeys.length; i += 1) {
  const currKey = sortableKeys[i];
  SORT_BY[`${currKey}Asc`] = `${sortableProperties[currKey]} Ascending`;
  SORT_BY[`${currKey}Desc`] = `${sortableProperties[currKey]} Descending`;
}

export const DEFAULT_SORT_BY = Object.keys(SORT_BY)[0];

export const PlayerType = PropTypes.shape({
  name: PropTypes.string,
  team: PropTypes.string,
  position: PropTypes.string,
  attempts: PropTypes.number,
  attemptsPerGame: PropTypes.number,
  yards: PropTypes.number,
  average: PropTypes.number,
  yardPerGame: PropTypes.number,
  touchDown: PropTypes.number,
  longGain: PropTypes.string,
  first: PropTypes.number,
  firstPercentage: PropTypes.number,
  twentyPlus: PropTypes.number,
  fourtPlus: PropTypes.number,
  fumbles: PropTypes.number,
});

export default {
  noop,
  SORT_BY,
  PlayerType,
  DEFAULT_SORT_BY,
};
