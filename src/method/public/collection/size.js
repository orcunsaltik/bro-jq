import { _keys } from '../../../var/private/window';

export default (obj) => obj.length || _keys(obj).length;
