"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function groupBy(arr, identifier) {
    const m = new Map();
    arr.forEach(item => {
        const prop = identifier(item);
        const collection = m.get(prop);
        if (collection) {
            collection.push(item);
        }
        else {
            m.set(prop, [item]);
        }
    });
    return m;
}
exports.groupBy = groupBy;
exports.padLeft = (num, count, glue = '0') => {
    const str = num.toString();
    if (str.length >= count)
        return str;
    return (new Array(count).join(glue) + str).slice(-count);
};
//# sourceMappingURL=index.js.map