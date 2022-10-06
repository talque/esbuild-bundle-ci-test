


/**
 * Strip leading './'
 */
export function pathNormalization(path: string): string {
    if (path.startsWith('./')) {
        return path.slice(2);
    } else {
        return path;
    }
}
