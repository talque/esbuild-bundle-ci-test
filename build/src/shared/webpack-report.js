"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackReport = void 0;
const fs_1 = require("fs");
const path_normalization_1 = require("./path-normalization");
class WebpackReport {
    constructor(reportFileName) {
        this.reportFileName = reportFileName;
        const buf = (0, fs_1.readFileSync)(reportFileName);
        this.json = JSON.parse(buf.toString());
    }
    /**
     * Return the chunk where the given filename is in
     */
    chunk(inputPath) {
        const path = (0, path_normalization_1.pathNormalization)(inputPath);
        return this.recursiveSearch(path, this.json);
    }
    /**
     * Return the top-level label (chunk filename) that contains the path
     */
    recursiveSearch(path, groups) {
        for (const group of groups) {
            if (group.path) {
                if ((0, path_normalization_1.pathNormalization)(group.path) === path)
                    return group.label;
            }
            if (group.groups) {
                const result = this.recursiveSearch(path, group.groups);
                if (result)
                    return group.label;
            }
        }
    }
}
exports.WebpackReport = WebpackReport;
