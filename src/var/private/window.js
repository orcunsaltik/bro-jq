import noop   from '../../method/public/function/noop';
import window from './root';

const Fn  = Function;
const Obj = Object;
const Arr = Array;
const Str = String;
const Num = Number;
const __A = Arr.prototype;
const __O = Obj.prototype;

const gcs = window.getComputedStyle;
const raf = window.requestAnimationFrame;
const caf = window.cancelAnimationFrame;
const sto = window.setTimeout;
const cto = window.clearTimeout;
const si  = window.setInterval;
const ci  = window.clearInterval;

const doc           = !!window.document     ?     window.document : {};
const docEl         = !!doc.documentElement ? doc.documentElement : {};
const DocumentTouch = window.DocumentTouch;
const createElement = !!doc.createElement ? doc.createElement : function () {
    return { style: {} };
};
const navigator = 'navigator' in window && window.navigator;

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
    parseInt, isNaN, doc, docEl, DocumentTouch, createElement, navigator
};
