const TrieNode = require('./TrieNode');

class Trie {
  constructor() {
    this.rootNode = new TrieNode();
  }

  insert(key, val) {
    let currNode = this.rootNode;
    for (let i = 0; i < key.length; i += 1) {
      const currChar = key[i];
      if (!currNode.hasChildChar(currChar)) {
        currNode.createChildForChar(currChar);
      }
      currNode = currNode.getChild(currChar);
    }
    currNode.insertEntry(val);
  }

  fetchEntries(filter = '') {
    let currNode = this.rootNode;
    for (let i = 0; i < filter.length; i += 1) {
      const currChar = filter[i];
      if (!currNode.hasChildChar(currChar)) {
        return [];
      }
      currNode = currNode.getChild(currChar);
    }
    return currNode.getAllEntries();
  }
}

module.exports = Trie;
