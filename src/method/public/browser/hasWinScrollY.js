import window  from '../../../var/private/root';
import { docEl } from '../../../var/private/window';

export default () => window.innerHeight < docEl.scrollHeight;
