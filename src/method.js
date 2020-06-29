import { _keys, _splice } from './var/private/window';

import Event           from './var/public/event';
import { Style }       from './var/public/style';
import Support         from './var/public/support';

import _hasWinScroll   from './method/public/browser/hasWinScroll';
import _hasWinScrollX  from './method/public/browser/hasWinScrollX';
import _hasWinScrollY  from './method/public/browser/hasWinScrollY';
import _bspn           from './method/public/browser/bspn';

import _ajax           from './method/public/ajax/ajax';
import _param          from './method/public/ajax/param';

import _childNodeIndex from './method/public/dom/childNodeIndex';
import _contains       from './method/public/dom/contains';
import _copyHtml       from './method/public/dom/copyHtml';

import _nodeName       from './method/public/dom/nodeName';
import _parseHtml      from './method/public/dom/parseHtml';
import _replaceHtml    from './method/public/dom/replaceHtml';
import _sort           from './method/public/dom/sort';
import _textHtml       from './method/public/dom/textHtml';

import _compact        from './method/public/array/compact';
import _diff           from './method/public/array/diff';
import _grep           from './method/public/array/grep';
import _find           from './method/public/array/find';
import _first          from './method/public/array/first';
import _inArr          from './method/public/array/inArr';
import _intersect      from './method/public/array/intersect';
import _last           from './method/public/array/last';
import _reverse        from './method/public/array/reverse';
import _unique         from './method/public/array/unique';
import _unite          from './method/public/array/unite';

import _each           from './method/public/collection/each';
import _extend         from './method/public/collection/extend';
import __filter        from './method/public/collection/filter';
import _map            from './method/public/collection/map';
import _merge          from './method/public/collection/merge';
import _size           from './method/public/collection/size';
import _toArr          from './method/public/collection/toArr';

import _has            from './method/public/object/has';
import _isArr          from './method/public/object/isArr';
import _isArrLike      from './method/public/object/isArrLike';
import _isBool         from './method/public/object/isBool';
import _isBot          from './method/public/object/isBot';
import _isDate         from './method/public/object/isDate';
import _isDoc          from './method/public/object/isDoc';
import _isElem         from './method/public/object/isElem';
import _isError        from './method/public/object/isError';
import _isEmpty        from './method/public/object/isEmpty';
import _isFn           from './method/public/object/isFn';
import _isJson         from './method/public/object/isJson';
import _isMap          from './method/public/object/isMap';
import _isNode         from './method/public/object/isNode';
import _isNull         from './method/public/object/isNull';
import _isNum          from './method/public/object/isNum';
import _isNumeric      from './method/public/object/isNumeric';
import _isObj          from './method/public/object/isObj';
import _isRegExp       from './method/public/object/isRegExp';
import _isSet          from './method/public/object/isSet';
import _isStr          from './method/public/object/isStr';
import _isSymbol       from './method/public/object/isSymbol';
import _isText         from './method/public/object/isText';
import _isUndefined    from './method/public/object/isUndefined';
import _isWeakMap      from './method/public/object/isWeakMap';
import _isWeakSet      from './method/public/object/isWeakSet';
import _isWin          from './method/public/object/isWin';
import _type           from './method/public/object/type';

import _noop           from './method/public/function/noop';

import _now            from './method/public/date/now';

import _camelCase      from './method/public/string/camelCase';
import _capitalize     from './method/public/string/capitalize';
import _dashCase       from './method/public/string/dashCase';

import _touch          from './method/public/event/touch';

import _data           from './method/public/data/data';
import _removeData     from './method/public/data/removeData';

import Bro             from './instance';

Bro.extend = _extend;
Bro.extend({
    compact: _compact,
    first: _first,
    last: _last,
    intersect: _intersect,
    unite: _unite,
    filter: __filter,
    
    keys: _keys,

    event: Event,
    style: Style,
    support: Support,

    ajax: _ajax,
    param: _param,
    hasWinScroll: _hasWinScroll,
    hasWinScrollX: _hasWinScrollX,
    hasWinScrollY: _hasWinScrollY,
    isBot: _isBot,
    bspn: _bspn,

    childNodeIndex: _childNodeIndex,
    contains: _contains,
    copyHtml: _copyHtml,
    isDoc: _isDoc,
    isElem: _isElem,
    isNode: _isNode,
    isText: _isText,
    isWin: _isWin,
    nodeName: _nodeName,
    parseHtml: _parseHtml,
    replaceHtml: _replaceHtml,
    sort: _sort,
    textHtml: _textHtml,

    diff: _diff,
    splice: _splice,
    each: _each,
    find: _find,
    grep: _grep,
    has: _has,
    inArr: _inArr,
    isArr: _isArr,
    isArrLike: _isArrLike,
    isBool: _isBool,
    isEmpty: _isEmpty,
    isError: _isError,
    isSet: _isSet,
    isDate: _isDate,
    isMap: _isMap,
    isNull: _isNull,
    isWeakMap: _isWeakMap,
    isWeakSet: _isWeakSet,
    isRegExp: _isRegExp,
    isSymbol: _isSymbol,
    isUndefined: _isUndefined,
    isFn: _isFn,
    isNum: _isNum,
    isObj: _isObj,
    isStr: _isStr,
    isJson: _isJson,
    map: _map,
    merge: _merge,
    reverse: _reverse,
    size: _size,
    toArr: _toArr,
    type: _type,
    unique: _unique,
    
    noop: _noop,
    now: _now,
    camelCase: _camelCase,
    capitalize: _capitalize,
    dashCase: _dashCase,
    isNumeric: _isNumeric,

    touch: _touch,

    data: _data,
    removeData: _removeData
});
