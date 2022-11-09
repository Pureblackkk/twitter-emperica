const MIN = -(2 ** 31);
const MAX = (2 ** 31) - 1;
export const pick = (arr, index) => arr[integer(index, 0, arr.length - 1)];
const integer = (value, min, max) => Math.floor(((value - MIN) / (MAX - MIN)) * (max + 1 - min) + min);
