"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const fs_1 = require("fs");
const path_normalization_1 = require("./path-normalization");
class Report {
    constructor(reportFileName) {
        const buf = (0, fs_1.readFileSync)(reportFileName);
        this.json = JSON.parse(buf.toString());
    }
    /**
     * Return the chunk where the given filename is in
     */
    chunk(inputPath) {
        const path = (0, path_normalization_1.pathNormalization)(inputPath);
        return this.searchChunk(path);
    }
    /**
     * Return the top-level label (chunk filename) that contains the path
     */
    searchChunk(path) {
        // console.log('searchChunk', path, Object.keys(this.json));
        for (const output in this.json.outputs) {
            // console.log('output', output);
            const inputs = this.json.outputs[output].inputs;
            for (const input in inputs) {
                // console.log('input', input);
                if ((0, path_normalization_1.pathNormalization)(input) === path)
                    return output;
            }
        }
        return undefined;
    }
    staticImporters(chunk) {
        const result = new Set();
        const todo = new Set();
        todo.add(chunk);
        while (todo.size > 0) {
            const c = todo.values().next().value;
            todo.delete(c);
            result.add(c);
            this.searchStaticImporters(c, result, todo);
        }
        return result;
    }
    /**
     * Return the top-level label (chunk filename) that contains the path
     */
    searchStaticImporters(chunk, result, todo) {
        // console.log('searchChunk', path, Object.keys(this.json));
        for (const output in this.json.outputs) {
            // console.log('output', output);
            const imports = this.json.outputs[output].imports;
            for (const { path, kind } of imports) {
                if (kind !== 'import-statement')
                    continue;
                if (path !== chunk)
                    continue;
                if (result.has(output))
                    continue;
                todo.add(output);
            }
        }
    }
}
exports.Report = Report;
