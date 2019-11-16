const RushingStore = require('../../../src/server/RushingStore');

describe('RushingStore', () => {
  it('should be able to look up a player', () => {
    const name = 'Joe Banyard';
    const lowerName = name.toLowerCase();
    const lookup = RushingStore.fetch(lowerName);
    expect(lookup.length).toBe(1);
    expect(lookup[0].name).toBe(name);
  });
  it('should filter out players', () => {
    const lookup = RushingStore.fetch('a');
    expect(lookup.length).toBeGreaterThan(0);
    const noA = lookup.filter((player) => !player.name.startsWith('A'));
    expect(noA.length).toBe(0);
    const onlyA = lookup.filter((player) => player.name.startsWith('A'));
    expect(onlyA.length).toBe(lookup.length);
  });
  it('should store long gain properly', () => {
    const lookup = RushingStore.fetch('mack brown');
    expect(lookup.length).toBe(1);
    const mack = lookup[0];
    expect(mack.longGain).toBe(61);
    expect(mack.longGainT).toBe(true);
  });
  it('should store the yard properly', () => {
    const lookup = RushingStore.fetch('lesean mccoy');
    expect(lookup.length).toBe(1);
    const lesean = lookup[0];
    expect(lesean.yards).toBe(1267);
  });
});
