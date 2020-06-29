import { animationEnd, transitionEnd } from './style';

const Event = {
     animationEnd,
    transitionEnd,
    touch: {
        touch: {
            start: 'touchstart',
             move: 'touchmove',
              end: 'touchend',
           cancel: 'touchcancel'
        },
        pointer: {
            start: 'pointerdown',
             move: 'pointermove',
              end: 'pointerup',
           cancel: 'pointercancel'
        },
        MSPointer: {
            start: 'MSPointerDown',
             move: 'MSPointerMove',
              end: 'MSPointerUp',
           cancel: 'MSPointerCancel'
        },
        mouse: {
            start: 'mousedown',
             move: 'mousemove',
              end: 'mouseup',
           cancel: 'mouseup'
        }
    }
};

export default Event;
