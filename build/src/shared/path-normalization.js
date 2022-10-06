"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathNormalization = void 0;
/**
 * Strip leading './'
 */
function pathNormalization(path) {
    if (path.startsWith('./')) {
        return path.slice(2);
    }
    else {
        return path;
    }
}
exports.pathNormalization = pathNormalization;
