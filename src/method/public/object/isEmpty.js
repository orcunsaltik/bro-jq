import { _keys } from '../../../var/private/window';

export default (obj) => obj == null || _keys(obj).length === 0;
