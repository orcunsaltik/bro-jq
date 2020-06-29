import _isStr from '../object/isStr';
import { parseFloat, isNaN } from '../../../var/private/window';

/* eslint no-param-reassign: 0 */

export default (data) => {
    if (data != null) {
        if (_isStr(data)) {
            if (data === 'true') {
                data = true;
            } else if (data === 'false') {
                data = false;
            } else if (!isNaN((parseFloat(data)))) {
                data = parseFloat(data);
            }
        }
    } else {
        data = undefined;
    }
    return data;
};
