export const darken = (hex, amount) => rgb2Hex(hex2Rgb(hex)
    .map((x) => clamp(x - amount, 0, 255)));
const hex2Rgb = (hex) => hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
const rgb2Hex = (rgb) => '#' + rgb
    .map((x) => `0${x.toString(16)}`.substr(-2))
    .join('');
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
