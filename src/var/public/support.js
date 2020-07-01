import window from '../private/root';
import { animation, transition }         from './style';
import { doc, DocumentTouch } from '../private/window';

const Support = {
           touch: !!(navigator in window && navigator.maxTouchPoints > 0 || 'ontouchstart' in window || (DocumentTouch && doc instanceof DocumentTouch)) && 'touch',
         pointer: (window.PointerEvent && 'pointer') || (window.MSPointerEvent && 'MSPointer'),
        mutation: !!window.MutationObserver,
    intersection: 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype,
        gestures: 'ongesturestart' in window,
      transition: !!transition,
       animation: !!animation
};

export default Support;
