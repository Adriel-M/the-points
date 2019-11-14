/* eslint dot-notation: 0 */
const Store = require('./Store');
const rushingData = require('./rushing.json');

const processYards = (yardEntry) => {
  if (typeof yardEntry === 'number') {
    return yardEntry;
  }
  if (typeof yardEntry === 'string') {
    return parseInt(yardEntry.replace(/,/g, ''), 10);
  }
  return NaN;
};

const processLongGain = (longGainEntry) => {
  if (typeof longGainEntry === 'number') {
    return {
      longGain: longGainEntry,
      longGainT: false,
    };
  }
  return {
    longGain: parseInt(longGainEntry, 10),
    longGainT: longGainEntry.endsWith('T'),
  };
};

const processEntry = (entry) => ({
  ...processLongGain(entry['Lng']),
  name: entry['Player'],
  team: entry['Team'],
  position: entry['Pos'],
  attempts: entry['Att'],
  attemptsPerGame: entry['Att/G'],
  yards: processYards(entry['Yds']),
  average: entry['Avg'],
  yardsPerGame: entry['Yds/G'],
  touchDown: entry['TD'],
  first: entry['1st'],
  firstPercentage: entry['1st%'],
  twentyPlus: entry['20+'],
  fourtyPlus: entry['40+'],
  fumbles: entry['FUM'],
});

const RushingStore = new Store();

for (let i = 0; i < rushingData.length; i += 1) {
  const toInsert = processEntry(rushingData[i]);
  RushingStore.insert(toInsert);
}

module.exports = RushingStore;
