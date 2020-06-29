import { toString } from '../../../var/private/window';

export default (obj) => toString.call(obj).replace(/[^ ]+ ([^\]]+)\]$/, '$1');
