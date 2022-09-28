function subarraySort(array) {
  // Write your code here.
}
array = [1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 11];
subarraySort(array);

// my solution
// 1-fid the two max and two min values
// 2-if min isn't at the statrt then the subarray starts at index 0
// 3-if the max isn't at the last index then the subarray ends at index n
// 4-if not 3 take the second min and find where to insert it starting the first index
// -- the first index that is bigger than the second min is the start of the sub array
// 5- the same as 4 but inverted
