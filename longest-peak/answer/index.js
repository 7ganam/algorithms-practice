function longestPeak(array) {
  let previousDeflection = 0;
  let maxLength = 0;
  let active = false;
  let direction =
    array[1] - array[0] === 0
      ? 0
      : (array[1] - array[0]) / Math.abs(array[1] - array[0]);
  let newDirection = direction;
  for (let i = 0; i < array.length; i++) {
    if (i !== array.length - 1) {
      newDirection =
        array[i + 1] - array[i] === 0
          ? 0
          : (array[i + 1] - array[i]) / Math.abs(array[i + 1] - array[i]);
    }
    if (i === array.length - 1 || i === 0 || newDirection !== direction) {
      console.log("i:", i, "value:", array[i], "active:", active, {
        newDirection,
        direction,
      });
      if (direction === -1 && active) {
        if (i - previousDeflection + 1 > maxLength) {
          maxLength = i - previousDeflection + 1;
        }
      }
      if (newDirection === 1) {
        active = true;
        previousDeflection = i;
      } else if (newDirection === 0) {
        active = false;
      }
    }
    direction = newDirection;
  }

  return maxLength;
}
array = [1, 3, 2];
console.log("longestPeak(array) ", longestPeak(array));

// 1- calculate every deflection points (where the slope changes)
// 2- use flag to indicate active case .. simple logic to define when to unset it
