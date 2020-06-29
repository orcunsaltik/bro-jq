import { hasOwn } from '../../../var/private/window';

export default (obj, prop) => !!obj && hasOwn.call(obj, prop);
