import { _filter } from '../../../var/private/window';

export default (arr, obj) => _filter.call(arr, (e) => obj.indexOf(e) < 0);
