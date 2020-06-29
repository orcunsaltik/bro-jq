import preventDefault           from './preventDefault';
import stopPropagation          from './stopPropagation';
import stopImmediatePropagation from './stopImmediatePropagation';

export default (e) => ({
    originalEvent: e,
    target: e.target,
    currentTarget: e.currentTarget,
    relatedTarget: e.relatedTarget,
    timeStamp: e.timeStamp,
    elapsedTime: e.elapsedTime,
    detail: e.detail,
    type: e.type,
    defaultPrevented: false,
    propagationStopped: false,
    immediatePropagationStopped: false,
    preventDefault,
    stopPropagation,
    stopImmediatePropagation
});
