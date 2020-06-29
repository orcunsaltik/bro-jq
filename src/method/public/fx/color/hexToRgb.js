import { parseInt } from '../../../../var/private/window';

export default (hex) => {
        
    hex = /#?([\da-f]{6})/i.exec(hex);
    
    if (hex !== null) {
        hex = hex[1];
        hex = [parseInt(hex[0] + hex[1], 16),  // red
               parseInt(hex[2] + hex[3], 16),  // green
               parseInt(hex[4] + hex[5], 16)]; // blue  
    }
    
    return hex;
};
