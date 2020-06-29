import window  from 'window';
import { docEl } from '../../../var/private/window';

export default () => window.innerWidth > docEl.clientWidth;
