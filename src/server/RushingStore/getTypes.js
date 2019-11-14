const rushingData = require('./rushing.json');

const types = {};

for (let i = 0; i < rushingData.length; i += 1) {
  const currEntry = rushingData[i];
  const currKeys = Object.keys(currEntry);
  for (let j = 0; j < currKeys.length; j += 1) {
    const key = currKeys[j];
    if (!(key in types)) {
      types[key] = new Set();
    }
    const currValue = currEntry[key];
    if (typeof currValue === 'number') {
      types[key].add(Number.isInteger(currValue) ? 'int' : 'float');
    } else {
      types[key].add(typeof currEntry[key]);
    }
  }
}

console.log(types);
