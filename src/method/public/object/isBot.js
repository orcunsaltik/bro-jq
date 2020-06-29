import window from 'window';
import { navigator } from '../../../var/private/window';

export default () => !('onscroll' in window) || ('navigator' in window
            && /bot|archiver|crawler|spider|spyder|search|seek|google|yandex|bing|yahoo|slurp/i
            .test(navigator.userAgent));
