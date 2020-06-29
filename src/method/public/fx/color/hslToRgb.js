import hueToRgb from './hueToRgb';

export default (h, s, l) => {
    let r;
    let g;
    let b;
    if (s === 0) {
        r = l;
        g = l;
        b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }
    return [r * 255, g * 255, b * 255];
};
