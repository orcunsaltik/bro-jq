import { _keys } from '../../../var/private/window';
import _now    from '../date/now';
import _extend from '../collection/extend';
import _isObj  from '../object/isObj';
import _isStr  from '../object/isStr';
import _param  from './param';

const _ajax = (uri, options) => {
    
    let settings;
    
    if (_isStr(uri)) {
        settings = options;
        if (_isObj(settings)) {
            settings.url = uri;
        } else {
            settings = {};
        }
    } else if (_isObj(uri)) {
        settings = uri;
    } else {
        return false;
    }

    const opts = _extend({}, _ajax.settings, settings);
    const xhr = new XMLHttpRequest();
    const {
        method,
        username,
        password,
        timeout,
        headers,
        responseType,
        xRequestedWith,
        withCredentials,
        contentType,
        onProgress,
        onTimeout,
        onError,
        onAbort,
        onLoad
    } = opts;

    let { 
        url, 
        data 
    } = opts;

    if (method === 'GET') {
        const uniq = (`${_now()}${Math.random()}`).replace('.', '');
        if (data != null) {
            data = _param(data, contentType);
            url += /\?/.test(url) ? data : `?${data}`;
            url += `&${uniq}`;
            data = null;
        } else {
            url += /\?/.test(url) ? `&${uniq}` : `?${uniq}`;
        }
    } else {
        data = _param(data, contentType);
    }

    headers['X-Requested-With'] = xRequestedWith;
    headers['Content-Type']     = contentType;

    const xhrp = new Promise((resolve, reject) => {
        
        xhr.open(method, url, true, username, password);
        xhr.responseType = responseType;

        const hK = _keys(headers);
        const hS = hK.length;
        
        let i = 0;
        for (; i < hS; i += 1) {
            xhr.setRequestHeader(hK[i], headers[hK[i]]);
        }

        if (withCredentials) {
            xhr.withCredentials = true;
        }
        
        if (timeout) {
            xhr.timeout = timeout;
            if (onTimeout) {
                xhr.addEventListener('timeout', onTimeout);
            }
        }
        
        if (onAbort) {
            xhr.addEventListener('abort', onAbort);
        }
        
        if (onProgress) {
            xhr.addEventListener('progress', onProgress);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status && (xhr.status >= 200 || xhr.status === 304)) {
                    onLoad(resolve, xhr);
                } else {
                    onError(reject, xhr);
                }
            }
        };

        xhr.send(data);
    });

    xhrp.cancel = () => xhr.abort();

    return xhrp;
};

_ajax.settings = {
             method: 'GET',
               data: null,
           username: null,
           password: null,
            timeout: null,
         onProgress: null,
          onTimeout: null,
            onAbort: null,
            headers: {},
       responseType: 'text',
        contentType: 'application/x-www-form-urlencoded',
     xRequestedWith: 'XMLHttpRequest',
    withCredentials: false,
            onError: (r, p) => r(p),
             onLoad: (r, p) => r(p.response)
};

export default _ajax;
