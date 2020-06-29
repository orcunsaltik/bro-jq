import { _indexOf, _filter } from '../../../var/private/window';

export default (obj) => _filter.call(obj, (e) => _indexOf.call([false, null, 0, '', undefined, NaN], e) < 0);
