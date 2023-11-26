import { readFileSync } from 'fs';
import { pathNormalization } from './path-normalization';


interface WebpackReportGroupJson {
    readonly label: string;
    readonly groups?: readonly WebpackReportGroupJson[];
    readonly path?: string;
}


export class WebpackReport {

    private readonly json: readonly WebpackReportGroupJson[];
    
    constructor(
        private readonly reportFileName: string
    ) {
        const buf = readFileSync(reportFileName);
        this.json = JSON.parse(buf.toString());
    }

    /**
     * Return the chunk where the given filename is in
     */
    chunk(inputPath: string): string | undefined {
        const path = pathNormalization(inputPath);
        return this.recursiveSearch(path, this.json);
    }

    /**
     * Return the top-level label (chunk filename) that contains the path
     */ 
    private recursiveSearch(path: string, groups: readonly WebpackReportGroupJson[]): string | undefined {
        for (const group of groups) {
            if (group.path) {
                if (pathNormalization(group.path) === path)
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
