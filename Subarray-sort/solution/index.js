function subarraySort(array) {
  // Write your code here.
  let { min1, min2, max1, max2 } = generateMaxMins(array);
  if (
    min1.index === 0 &&
    min2.index === array.length - 1 &&
    max1.index === array.length - 1 &&
    max2.index === 0
  ) {
    console.log("array is sorted");
    return [-1, -1];
  }
  let arrayStart;
  let arrayEnd;
  if (min1.index !== 0) {
    arrayStart = 0;
  } else {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (min2.value < element) {
        arrayStart = i;
        break;
      }
    }
  }

  if (max1.index !== array.length - 1) {
    arrayEnd = array.length - 1;
  } else {
    for (let i = array.length - 1; i >= 0; i--) {
      const element = array[i];
      if (max2.value > element) {
        arrayEnd = i;
        break;
      }
    }
  }
  console.log("min1", min1);
  console.log("min2", min2);
  console.log("max1", max1);
  console.log("max2", max2);
  return [arrayStart, arrayEnd];
}

function generateMaxMins(array) {
  let min1 = { value: Infinity, index: -1 };
  let min2 = { value: Infinity, index: -1 };
  let max1 = { value: -Infinity, index: -1 };
  let max2 = { value: -Infinity, index: -1 };

  let direction =
    array[1] - array[0] === 0
      ? 0
      : (array[1] - array[0]) / Math.abs(array[1] - array[0]);
  let newDirection = direction;
  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    if (i !== array.length - 1) {
      newDirection =
        array[i + 1] - array[i] === 0
          ? 0
          : (array[i + 1] - array[i]) / Math.abs(array[i + 1] - array[i]);
    }
    if (
      i === 0 ||
      i === array.length - 1 ||
      ((newDirection === 1 || newDirection === -1) &&
        newDirection !== direction)
    ) {
      //this detects a peak only if increase or decrease .. if two values equal the same value it's not a peak

      direction = newDirection;

      if (element >= max1.value) {
        max2 = max1;
        max1 = { value: element, index: i };
      } else if (element >= max2.value) {
        max2 = { value: element, index: i };
      }
      if (element < min1.value) {
        min2 = min1;
        min1 = { value: element, index: i };
      } else if (element < min2.value) {
        min2 = { value: element, index: i };
      }
    }
  }
  return { max1, max2, min1, min2 };
}
array = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
array2 = [-41, 8, 7, 12, 100, 9, -1, 3, 9, 16, -15, 51];
console.log("subarraySort(array);", subarraySort(array));
// my solution
// 0-find the peaks including the first and last points in the array
// 1-fid the two max and two min values in the peaks
// ----: for 2 and 3 long arrays just make the same value appear twice in the two max two min arrays
// 2-if min isn't at the start then the subarray starts at index 0
// 3-if the max isn't at the last index then the subarray ends at index n
// 4-if not 3 take the second min and find where to insert it starting the first index
// -- the first index that is bigger than the second min is the start of the sub array
// 5- the same as 4 but inverted
