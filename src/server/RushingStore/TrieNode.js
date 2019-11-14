class TrieNode {
  constructor(char = '') {
    this.char = char;
    this.children = {};
    this.entries = [];
  }

  hasChildChar(char) {
    return char in this.children;
  }

  createChildForChar(char) {
    if (this.hasChildChar(char)) {
      return;
    }
    this.children[char] = new TrieNode(char);
  }

  getChild(char) {
    return this.children[char];
  }

  insertEntry(val) {
    this.entries.push(val);
  }

  getAllEntries() {
    const entries = [];
    const traverse = (currNode) => {
      if (!currNode) {
        return;
      }
      for (let i = 0; i < currNode.entries.length; i += 1) {
        entries.push(currNode.entries[i]);
      }
      const childChars = Object.keys(currNode.children);
      for (let i = 0; i < childChars.length; i += 1) {
        const childChar = childChars[i];
        traverse(currNode.children[childChar]);
      }
    };
    traverse(this);
    return entries;
  }
}

module.exports = TrieNode;
