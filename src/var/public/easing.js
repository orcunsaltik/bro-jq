import Bro from '../../instance';

const easing = Bro.easing || {
    linear(n) { return n; },
     swing(n) { return 0.5 - Math.cos(n * Math.PI) / 2; } 
};

export default  easing;
