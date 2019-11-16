const _ = require('lodash');

const playerResolver = require('../../../src/server/Schema/playersResolver');
const rushingData = require('../../../src/server/RushingStore/rushing.json');

describe('playerResolve', () => {
  const parent = {};
  it('should fetch everyone', () => {
    const lookup = playerResolver(parent, {});
    const { players, suggestions, totalCount } = lookup;
    expect(players.length).toBe(rushingData.length);
    expect(totalCount).toBe(rushingData.length);
    const sortedNames = _.sortBy(players, 'name');
    const first10Names = sortedNames.slice(0, 10).map((player) => player.name);
    expect(suggestions).toStrictEqual(first10Names);
  });
  it('should offset correctly', () => {
    const offset = 10;
    const allLookup = playerResolver(parent, {});
    const offsetLookup = playerResolver(parent, {
      offset,
    });
    const allPlayers = allLookup.players;
    const offsetPlayers = offsetLookup.players;

    expect(offsetLookup.totalCount).toBe(rushingData.length);

    for (let i = 0; i < offsetPlayers.length; i += 1) {
      expect(offsetPlayers[i]).toEqual(allPlayers[i + offset]);
    }
  });
  it('should limit correctly', () => {
    const limit = 10;
    const allLookup = playerResolver(parent, {});
    const limitLookup = playerResolver(parent, {
      limit,
    });
    const allPlayers = allLookup.players;
    const limitPlayers = limitLookup.players;
    expect(limitPlayers.length).toBe(limit);
    expect(limitLookup.totalCount).toBe(allPlayers.length);
    for (let i = 0; i < limitPlayers.length; i += 1) {
      expect(limitPlayers[i]).toEqual(allPlayers[i]);
    }
  });
  it('should limit and offset correctly', () => {
    const limit = 20;
    const offset = 50;
    const allLookup = playerResolver(parent, {});
    const limitOffset = playerResolver(parent, {
      limit,
      offset,
    });
    const allPlayers = allLookup.players;
    const limitOffsetPlayers = limitOffset.players;
    expect(limitOffsetPlayers.length).toBe(limit);
    expect(limitOffset.totalCount).toBe(rushingData.length);
    for (let i = 0; i < limitOffsetPlayers.lenght; i += 1) {
      expect(limitOffsetPlayers[i]).toBe(allPlayers[i + offset]);
    }
  });
  it('should filter correctly', () => {
    const joeLookup = playerResolver(parent, { filter: 'joe' });
    const joePlayers = joeLookup.players;
    expect(joePlayers.length).toBeGreaterThan(0);
    for (let i = 0; i < joePlayers.length; i += 1) {
      expect(joePlayers[i].name.startsWith('Joe')).toBe(true);
    }
  });
  it('should sort by yards', () => {
    const yardsAscendingLookup = playerResolver(parent, {
      sortBy: 'yardsAsc',
    });
    const yardsDescendingLookup = playerResolver(parent, {
      sortBy: 'yardsDesc',
    });
    const ascendingPlayers = yardsAscendingLookup.players;
    for (let i = 0; i < ascendingPlayers.length - 1; i += 1) {
      expect(
        ascendingPlayers[i].yards <= ascendingPlayers[i + 1].yards
      ).toBe(true);
    }
    const descendingPlayers = yardsDescendingLookup.players;
    for (let i = 0; i < descendingPlayers.length - 1; i += 1) {
      expect(
        descendingPlayers[i].yards >= descendingPlayers[i + 1].yards
      ).toBe(true);
    }
  });
  it('should sort by longGain', () => {
    const longGainAscendingLookup = playerResolver(parent, {
      sortBy: 'longGainAsc',
    });
    const longGainDescendingLookup = playerResolver(parent, {
      sortBy: 'longGainDesc',
    });
    const ascendingPlayers = longGainAscendingLookup.players;
    for (let i = 0; i < ascendingPlayers.length - 1; i += 1) {
      expect(
        ascendingPlayers[i].longGain <= ascendingPlayers[i + 1].longGain
      ).toBe(true);
    }
    const descendingPlayers = longGainDescendingLookup.players;
    for (let i = 0; i < descendingPlayers.length - 1; i += 1) {
      expect(
        descendingPlayers[i].longGain >= descendingPlayers[i + 1].longGain
      ).toBe(true);
    }
  });
  it('should sort by touchdown', () => {
    const touchDownAscendingLookup = playerResolver(parent, {
      sortBy: 'touchDownAsc',
    });
    const touchDownDescendingLookup = playerResolver(parent, {
      sortBy: 'touchDownDesc',
    });
    const ascendingPlayers = touchDownAscendingLookup.players;
    for (let i = 0; i < ascendingPlayers.length - 1; i += 1) {
      expect(
        ascendingPlayers[i].touchDown <= ascendingPlayers[i + 1].touchDown
      ).toBe(true);
    }
    const descendingPlayers = touchDownDescendingLookup.players;
    for (let i = 0; i < descendingPlayers.length - 1; i += 1) {
      expect(
        descendingPlayers[i].touchDown >= descendingPlayers[i + 1].touchDown
      ).toBe(true);
    }
  });
});
