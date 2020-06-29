import { _filter } from '../../../var/private/window';

export default (obj) => _filter.call(obj, (v, i) => obj.indexOf(v) === i);
