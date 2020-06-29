import _bspn from '../../method/public/browser/bspn';

const animation          = _bspn('animation');
const animationDuration  = _bspn('animationDuration');
const animationEnd       = !!animation && animation.indexOf('Webkit') === 0  ? 'webkitAnimationEnd' : 'animationend';
const transition         = _bspn('transition');
const transitionDuration = _bspn('transitionDuration');
const transitionEnd      = !!transition && transition.indexOf('Webkit') === 0  ? 'webkitTransitionEnd' : 'transitionend';
const transform          = _bspn('transform');

const Style = {
             animation,
     animationDuration,
            transition,
    transitionDuration,
             transform
};

export {
    animation,
    animationDuration,
    animationEnd,
    transition,
    transitionDuration,
    transitionEnd,
    transform,
    Style
};
