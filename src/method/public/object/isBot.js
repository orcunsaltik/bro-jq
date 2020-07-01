import window from '../../../var/private/root';
import { navigator } from '../../../var/private/window';

export default () => !('onscroll' in window) || (navigator && /bot|archiver|crawler|spider|spyder|search|seek|google|yandex|bing|yahoo|slurp/i
            .test(navigator.userAgent));
