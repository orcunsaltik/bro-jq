import window from '../private/root';
import { animation, transition }         from './style';
import { doc, DocumentTouch, navigator } from '../private/window';

const Support = {
           touch: !!(!!navigator && navigator.maxTouchPoints > 0 || 'ontouchstart' in window || (DocumentTouch && doc instanceof DocumentTouch)) && 'touch',
         pointer: (window.PointerEvent && 'pointer') || (window.MSPointerEvent && 'MSPointer'),
        mutation: !!window.MutationObserver,
    intersection: 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype,
        gestures: 'ongesturestart' in window,
      transition: !!transition,
       animation: !!animation
};

export default Support;
