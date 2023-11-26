import { readFileSync } from 'fs';
import { pathNormalization } from './path-normalization';
import { Metafile } from './metafile.interface';


export class Report {

    private readonly json: Metafile;
    
    constructor(
        reportFileName: string
    ) {
        const buf = readFileSync(reportFileName);
        this.json = JSON.parse(buf.toString()) as Metafile;
    }

    /**
     * Return the chunk where the given filename is in
     */
    chunk(inputPath: string): string | undefined {
        const path = pathNormalization(inputPath);
        return this.searchChunk(path);
    }

    /**
     * Return the top-level label (chunk filename) that contains the path
     */ 
    private searchChunk(path: string): string | undefined {
        // console.log('searchChunk', path, Object.keys(this.json));
        for (const output in this.json.outputs) {
            // console.log('output', output);
            const inputs = this.json.outputs[output].inputs
            for (const input in inputs) {
                // console.log('input', input);
                if (pathNormalization(input) === path)
                    return output;
            }
        }
        return undefined;
    }

    staticImporters(chunk: string): ReadonlySet<string> {
        const result = new Set<string>();
        const todo = new Set<string>();
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
    private searchStaticImporters(
        chunk: string,
        result: Set<string>,
        todo: Set<string>,
    ): void {
        // console.log('searchChunk', path, Object.keys(this.json));
        for (const output in this.json.outputs) {
            // console.log('output', output);
            const imports = this.json.outputs[output].imports
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
