import * as glob from 'glob';


/**
 * Expand input files and globs
 *
 * Throws an error if a file does not exist or a glob matches zero
 * files.
 */
export function expandGlobs(
    filesOrGlobs: readonly string[],
): readonly string[] {
    const result: string[] = [];
    for (const pattern of filesOrGlobs) {
        const matches = glob.sync(pattern);
        if (matches.length === 0)
            throw new Error('file not found: ' + pattern);
        matches.sort();
        result.push(...matches);
    }
    return result;
}
