/* eslint-disable */
export default {
    0: (r, a, b, c) => a + ((b - a) * r) + c, // increase
    1: (r, a, b, c) => a - ((a - b) * r) + c, // decrease
    2: (r, a, b, c, d, e, f) => {             // rgb
        a = a < d ? a + ((d - a) * r) : a - ((a - d) * r);
        b = b < e ? b + ((e - b) * r) : b - ((b - e) * r);
        c = c < f ? c + ((f - c) * r) : c - ((c - f) * r);
        return `rgb(${a},${b},${c})`;
    },
    3: (r, a, b, c, d, e, f, g, h) => {       // rgba
        a = a < d ? a + ((d - a) * r) : a - ((a - d) * r);
        b = b < e ? b + ((e - b) * r) : b - ((b - e) * r);
        c = c < f ? c + ((f - c) * r) : c - ((c - f) * r);
        g = g < h ? g + ((h - g) * r) : g - ((g - h) * r);
        return `rgba(${a},${b},${c},${g})`;
    },
    4: (r, a, b, c, d) => `rgba(${a},${b},${c},${d * r})`,
    5: (r, a, b) => a + ((b - a) * r),
    6: (r, a, b) => a - ((a - b) * r),
    7: (r, a, b) => a,
    8: (r, a) => `matrix(${a[0][0](r, a[0][1], a[0][2])},${a[1][0](r, a[1][1], a[1][2])},${a[2][0](r, a[2][1], a[2][2])},${a[3][0](r, a[3][1], a[3][2])},${a[4][0](r, a[4][1], a[4][2])},${a[5][0](r, a[5][1], a[5][2])})`
};
/* eslint-enable */
