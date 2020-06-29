import _now     from '../date/now';
import _noop    from '../function/noop';
import _extend  from '../collection/extend';
import Bro      from '../../../instance';

export default (opts) => {
    const defaults = {
                  ts: 150,   // tap       speed
                 dts: 350,   // doubletap speed
                 lts: 1000,  // longtap   speed,
             onStart: _noop,
              onDrag: _noop,
         onDragLeave: _noop,
              onZoom: _noop,
               onTap: _noop,
         onDoubleTap: _noop,
           onLongTap: _noop
    };

    _extend(opts, defaults, _extend({}, opts));
    
    const _ = {
              t1: {},
              t2: {},
        isDouble: false,
           begin: false,
           scale: 1
    };

    const onTouchStart = (event) => {

        const { data } = event;
        const e = event.originalEvent;
        const t = _;

        e.preventDefault();

        if (
               _.isDouble
            || (e.type !== 'touchstart' && e.button > 0)
            || e.which > 1
        ) {
            return;
        }

        const touches = e.type === 'touchstart' ? e.touches : [e];
        const touch1  = touches[0];
        const touch2  = touches[1];
        const current = _now(); 
        const { t1 } = _;
        const { t2 } = _;

        _.begin = true;

        if (!touch2) {

            t1.prevX = touch1.clientX;
            t1.prevY = touch1.clientY;
            t1.currX = t1.prevX;
            t1.currY = t1.prevY;
            t1.start = current;

        } else {

            t2.prevX = touch2.clientX;
            t2.prevY = touch2.clientY;
            t2.currX = t2.prevX;
            t2.currY = t2.prevY;
            t2.start = current;

            _.isDouble = true;
            
            _.xDist = Math.abs(t1.prevX - t2.prevX);
            _.yDist = Math.abs(t1.prevY - t2.prevY);
        }

        event.touch = t;

        // touch start
        opts.onStart.call(data, event);
    };

    const onTouchMove = (event) => {

        const { data } = event;
        const e = event.originalEvent;
        const t = _;

        if (!_.begin) {
            return;
        }
       
        event.touch = t;

        const touches = e.type === 'touchmove' ? e.touches : [e];
        const touch1 = touches[0];
        const touch2 = touches[1];
        const { t1 } = _;
        const { t2 } = _;

        if (!touch2) {

            t1.currX = touch1.clientX;
            t1.currY = touch1.clientY;
            t1.diffX = t1.currX - t1.prevX;
            t1.diffY = t1.currY - t1.prevY;

            // Scrolling | Panning
            opts.onDrag.call(data, event);

        } else {

            t1.currX = touch1.clientX;
            t1.currY = touch1.clientY;

            t2.currX = touch2.clientX;
            t2.currY = touch2.clientY;            
                
            const distX = Math.abs(t1.currX - t2.currX);
            const distY = Math.abs(t1.currY - t2.currY);
                
            if (!_.distX) _.distX = distX;  
            if (!_.distY) _.distY = distY;
            
            _.scaleX = distX / _.distX;
            _.scaleY = distY / _.distY;
            
            _.distX  = distX;
            _.distY  = distY;            
            _.scale  = (_.scaleX + _.scaleY) / 2;          
            
            // Zoom Etc.
           opts.onZoom.call(data, event);
        }
    };

    const onTouchEnd = (event) => {

        const { data } = event;
        const e = event.originalEvent;
        const changed = e.touches;
        const changes = changed && changed.length;
    
        _.scale = 1;
        _.distX = '';
        _.distY = '';

        if (!_.begin || changes > 1) {
            return;
        }

        _.isDouble = false;

        const last = _now();

        if (changes) {
            if (changed.identifier && changed.identifier === 1) {
                _.t1 = _.t2;
            }   _.t2 = {};
            
            _.past = 0;
            
        } else {

            const { t1 } = _;
            const time = last - t1.start;

            _.t1    = {};
            _.begin = false;
            _.xDist = null;
            _.yDist = null;

            if (t1.prevX === t1.currX && t1.prevY === t1.currY) {
                if (time < opts.ts) {
                    if (_.past && last - _.past + time < opts.dts) {
                        _.past = null;
                        opts.onDoubleTap.call(data, event);
                    } else {
                        _.past = last;
                    }
                } else if (time > opts.lts) {
                    opts.onLongTap.call(data, event);
                } else {
                    opts.onTap.call(data, event);
                }
            } else {
                
                // radius, velocity, direction, distance
                const x = t1.diffX;
                const y = t1.diffY;
                const absX = Math.abs(x);
                const absY = Math.abs(y);
                const d = absX > absY ? 'X' : 'Y';
                let p;
                let n;

                if (d === 'X') {
                    n = absX;
                    p = x < 0 ? 'left' : 'right';
                } else {
                    n = absY;
                    p = y < 0 ? 'up' : 'down';
                }

                event.touch = {
                    direction: d,
                         dist: n,
                        distX: x,
                        distY: y,
                      elapsed: time,
                     position: p,
                       radius: (Math.atan2(y, x) * 180) / Math.PI
                };

                // swipe | dragleave
                opts.onDragLeave.call(data, event);
            }
        }
    };

    Bro(opts.start.el).on(opts.start.event, opts.start.data || {},  onTouchStart);
    Bro(opts.move.el).on(opts.move.event,    opts.move.data || {},  onTouchMove);
    Bro(opts.end.el).on(opts.end.event,       opts.end.data || {},  onTouchEnd);

    return opts;
};
