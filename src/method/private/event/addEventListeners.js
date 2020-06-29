import { _keys } from '../../../var/private/window';

export default (elem, data) => {
        
    const typeK = _keys(data);
    const typeS = typeK.length;
    
    let i = 0;
    let j;
    let k;
    for (; i < typeS; i += 1) {     
        
        const ns  = data[typeK[i]];        
        const nsK = _keys(ns);
        const nsS = nsK.length;
        
        j = 0;
        for (; j < nsS; j += 1) {
            
            const id  = ns[nsK[j]];
            const idK = _keys(id);
            const idS = idK.length;            

            k = 0;
            for (; k < idS; k += 1) {
                
                const event = id[idK[k]];
                
                if (event) {
                    elem.addEventListener(
                        event.type,
                        event.proxyListener,
                        event.capture
                    );
                }
            }
        }
    }
};
