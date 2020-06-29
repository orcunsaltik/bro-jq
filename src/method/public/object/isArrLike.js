import _isStr from './isStr';

export default (obj) => !!obj && !_isStr(obj) && typeof obj.length === 'number';
