import Bro     from '../instance';
import _textHtml from '../method/public/dom/textHtml';

Bro.fn.extend({

    replaceAll(target) {

        target = Bro(target);

        const self = this;
        const size = self.length;
        const leng = target.length;
        const elms = [];
        let i = 0;

        for (; i < leng; i += 1) {

            const node       = target[i];
            const nodeParent = node.parentNode;

            if (!nodeParent) {
                continue;
            }

            const next = node.nextSibling;            
            const setC = (s, x, y) =>  (s - 1 > x
                    ? Bro(self[y]).clone(true)[0]
                    : self[y]);              
            
            let child = setC(leng, i, 0);
            
            nodeParent.replaceChild(child, node);
            elms.push(child);

            let j = 1;
            for (; j < size; j += 1) {
                child = setC(leng, i, j);
                nodeParent.insertBefore(child, next);                
                elms.push(child);
            }
        }

        return self.make(elms);
    },
    
    replaceWith() {
        
        const self = this;
          let size = self.length;
          
        // eslint-disable-next-line
        while (size--) {
            
            const elem       = self[size];
            const args       = arguments;
            const nodeParent = elem.parentNode;
              let leng       = args.length;

            if (!nodeParent) {
                continue;
            }

            if (!leng) {
                nodeParent.removeChild(elem);
                continue;
            }
            
            // eslint-disable-next-line
            while (leng--) {                
                let node = args[leng];
                
                if (typeof node !== 'object') {
                    node = _textHtml(node);
                } else if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
                
                if (node.length > 1) {
                    while (node[0]) {
                        nodeParent.insertBefore(node[0], elem.previousSibling);
                    } elem.remove();
                } else if (leng) {
                    nodeParent.replaceChild(node, elem);
                } else {
                    nodeParent.insertBefore(node, elem.previousSibling);
                }    
            }         
        }

        return self;
    }
});
