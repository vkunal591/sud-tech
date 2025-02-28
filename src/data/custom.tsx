export function flattenObject(obj: any, parentKey = '', result:any = {}) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey:any = parentKey ? `${parentKey}${key.charAt(0).toUpperCase() + key.slice(1)}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                flattenObject(obj[key], newKey, result);
            } else {
                result[newKey] = obj[key];
            }
        }
    }
    return result;
}
