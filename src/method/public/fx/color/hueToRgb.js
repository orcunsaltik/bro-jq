export default (p, q, t) => {
    let i = t;
    if (i < 0) i += 1;
    if (i > 1) i -= 1;
    if (i < 1 / 6) return p + (q - p) * 6 * i;
    if (i < 1 / 2) return q;
    if (i < 2 / 3) return p + (q - p) * (2 / 3 - i) * 6;
    return p;
};
