import { styleObj, styleFix } from '../../../var/private/detect';

export default (prop) => {
    if (!(prop in styleObj)) {
        const capName = prop[0].toUpperCase() + prop.slice(1);
                let i = styleFix.length;
        // eslint-disable-next-line         
        while (i--) {
            prop = styleFix[i] + capName;
            if (prop in styleObj) {
                break;
            }
        }
    }  return prop;
};
