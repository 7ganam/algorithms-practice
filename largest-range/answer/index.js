function largestRange(array) {
  // Write your code here.
  let hashTable = {};
  let maxRange = 0;
  let start = 1;
  let end = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (!hashTable[element]) {
      if (!hashTable[element + 1] && !hashTable[element - 1]) {
        hashTable[element] = {
          pointer: { rangeLength: 1, start: element, end: element },
        };
        if (hashTable[element].pointer.rangeLength > maxRange) {
          maxRange = hashTable[element].pointer.rangeLength;
          start = hashTable[element].pointer.start;
          end = hashTable[element].pointer.end;
        }
      }
      if (hashTable[element + 1] && hashTable[element - 1]) {
        console.log("element", element);

        let newRange =
          hashTable[element + 1].pointer.rangeLength +
          hashTable[element - 1].pointer.rangeLength +
          1;
        let newStart = hashTable[element - 1].pointer.start;
        let newEnd = hashTable[element + 1].pointer.end;
        // set previous pointer to new values
        hashTable[element - 1].pointer.rangeLength = newRange;
        hashTable[element - 1].pointer.start = newStart;
        hashTable[element - 1].pointer.end = newEnd;
        // set next pointer to point to previous pointer:
        hashTable[element + 1].pointer = hashTable[element - 1].pointer;
        // set element object to any ones object:
        hashTable[element] = hashTable[element - 1];
        console.log(
          element,
          "connected to ->",
          element - 1,
          element + 1,
          "start:",
          newStart,
          "end",
          newEnd,
          hashTable[element] === hashTable[element - 1]
        );

        //compare ranges length
        if (hashTable[element].pointer.rangeLength > maxRange) {
          maxRange = hashTable[element].pointer.rangeLength;
          start = hashTable[element].pointer.start;
          end = hashTable[element].pointer.end;
        }
      } else if (hashTable[element + 1]) {
        hashTable[element] = hashTable[element + 1];
        hashTable[element].pointer.rangeLength =
          hashTable[element].pointer.rangeLength + 1;
        hashTable[element].pointer.start = element;
        console.log(
          element,
          "connected to ->",
          element + 1,
          "start:",
          element,
          "end",
          hashTable[element].pointer.end
        );

        if (hashTable[element].pointer.rangeLength > maxRange) {
          maxRange = hashTable[element].pointer.rangeLength;
          start = hashTable[element].pointer.start;
          end = hashTable[element].pointer.end;
        }
      } else if (hashTable[element - 1]) {
        hashTable[element] = hashTable[element - 1];
        hashTable[element].pointer.rangeLength =
          hashTable[element].pointer.rangeLength + 1;
        hashTable[element].pointer.end = element;
        console.log(
          element,
          "connected to ->",
          element - 1,
          "start:",
          hashTable[element].pointer.start,
          "end",
          element
        );

        if (hashTable[element].pointer.rangeLength > maxRange) {
          maxRange = hashTable[element].pointer.rangeLength;
          start = hashTable[element].pointer.start;
          end = hashTable[element].pointer.end;
        }
      }
    }
  }

  return [start, end];
}

array = [
  -7, -7, -7, -7, 8, -8, 0, 9, 19, -1, -3, 18, 17, 2, 10, 3, 12, 5, 16, 4, 11,
  -6, 8, 7, 6, 15, 12, 12, -5, 2, 1, 6, 13, 14, -4, -2,
];

console.log("largestRange(array)", largestRange(array));
// - loop and hash
// - if a number already exists in the hash ignore it
// - if a number doesn't have it's next integer or previous integer in the hash it will be hashed with value =
//  {<the-integer>: {rangeLength:1}}
// - if a number has a previous or next integer in the array -> hash it and link its {rangLength: ..} object to the same reference
// of the adjacent integer -> then increment the rangeLength value of this object -> then compare if the new length is bigger than the max length
