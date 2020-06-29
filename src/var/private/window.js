import {
    Function,
    String,
    Object,
    Array,
    Number,
    getComputedStyle,
    requestAnimationFrame,
    cancelAnimationFrame,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    document,
    DocumentTouch,
    navigator
} from 'window';

const Fn = Function;
const Obj = Object;
const Arr = Array;
const Str = String;
const Num = Number;
const __A = Arr.prototype;
const __O = Obj.prototype;
const doc = document;
const docEl = doc.documentElement;
const gcs = getComputedStyle;
const raf = requestAnimationFrame;
const caf = cancelAnimationFrame;
const sto = setTimeout;
const cto = clearTimeout;
const si = setInterval;
const ci = clearInterval;
const _keys = Obj.keys;
const _concat  = __A.concat;
const _filter  = __A.filter;
const _indexOf = __A.indexOf;
const _slice   = __A.slice;
const _splice  = __A.splice;
const { toString } = __O;
const { parseInt, parseFloat, isNaN } = Num;
const hasOwn = __O.hasOwnProperty;

export {
    Fn, Obj, Arr, Str, Num,
    gcs, raf, caf, sto, cto, si, ci,
    _concat, _filter, _indexOf, _slice, _splice, _keys,
    hasOwn, toString, parseFloat,
    parseInt, isNaN, doc, docEl, navigator, DocumentTouch
};
