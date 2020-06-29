import Bro from '../../instance';

export default easing = Bro.easing || {
    linear(n) { return n; },
     swing(n) { return 0.5 - Math.cos(n * Math.PI) / 2; } 
};
