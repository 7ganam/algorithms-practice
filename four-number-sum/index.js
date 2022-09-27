function fourNumberSum(array, targetSum) {
  // Write your code here.
  let hashTable = {};
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      let sum2 = array[i] + array[j];
      let hashedValue = hashTable[sum2];
      if (!hashedValue) {
        hashTable[sum2] = [[array[i], array[j]]];
      } else {
        hashTable[sum2] = [...hashTable[sum2], [array[i], array[j]]];
      }
    }
  }
  let results = [];
  let bannedSum = new Set([]);
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      let sum2 = array[i] + array[j];
      if (hashTable[targetSum - sum2]) {
        hashTable[targetSum - sum2].forEach((element) => {
          let possibleQuadruple = [...element, array[i], array[j]];
          results = [...results, possibleQuadruple];
        });
      }
    }
  }
  return results;
}

array = [-10, -3, -5, 2, 15, -7, 28, -6, 12, 8, 11, 5];
targetSum = 20;

console.log("fourNumberSum(array, targetSum)", fourNumberSum(array, targetSum));
