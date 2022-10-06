"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandGlobs = void 0;
const glob = __importStar(require("glob"));
/**
 * Expand input files and globs
 *
 * Throws an error if a file does not exist or a glob matches zero
 * files.
 */
function expandGlobs(filesOrGlobs) {
    const result = [];
    for (const pattern of filesOrGlobs) {
        const matches = glob.sync(pattern);
        if (matches.length === 0)
            throw new Error('file not found: ' + pattern);
        matches.sort();
        result.push(...matches);
    }
    return result;
}
exports.expandGlobs = expandGlobs;
