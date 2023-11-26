
export interface Metafile {
    readonly inputs: {
        readonly [path: string]: {
            readonly bytes: number;
            readonly imports: ReadonlyArray<{
                readonly path: string;
                readonly kind: string;
                readonly external?: boolean;
                readonly original?: string;
                readonly with?: Record<string, string>;
            }>;
            readonly format?: string;
            readonly with?: Record<string, string>;
        };
    };
    readonly outputs: {
        readonly [path: string]: {
            readonly bytes: number;
            readonly inputs: {
                readonly [path: string]: {
                    readonly bytesInOutput: number;
                };
            };
            readonly imports: ReadonlyArray<{
                readonly path: string;
                readonly kind: string;
                readonly external?: boolean;
            }>;
            readonly exports: readonly string[];
            readonly entryPoint?: string;
            readonly cssBundle?: string;
        }
    }
}
