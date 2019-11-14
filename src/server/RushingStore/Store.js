const Trie = require('./Trie');

class Store {
  constructor() {
    this.players = {};
    this.size = 0;
    this.trie = new Trie();
  }

  insert({
    name,
    team,
    position,
    attempts,
    attemptsPerGame,
    yards,
    average,
    yardsPerGame,
    touchDown,
    longGain,
    longGainT,
    first,
    firstPercentage,
    twentyPlus,
    fourtyPlus,
    fumbles,
  }) {
    const newId = this.size;
    this.size += 1;
    this.players[newId] = {
      name,
      team,
      position,
      attempts,
      attemptsPerGame,
      yards,
      average,
      yardsPerGame,
      touchDown,
      longGain,
      longGainT,
      first,
      firstPercentage,
      twentyPlus,
      fourtyPlus,
      fumbles,
    };
    const key = name.toLocaleLowerCase();
    this.trie.insert(key, newId);
  }

  fetch(filter = '') {
    const ids = this.trie.fetchEntries(filter);
    return ids.map((id) => this.players[id]);
  }
}

module.exports = Store;
