import _isStr from './isStr';
import _isObj from './isObj';

export default (str) => {
    if (_isStr(str)) {
        try {
            return _isObj(JSON.parse(str));
        } catch (e) {
            return false;
        }
    } return false;
};
