import type { Arguments, CommandBuilder } from 'yargs';
import { ChunkStats } from '../shared/chunk-stats';
import { expandGlobs } from '../shared/expand-globs';
import { Report } from '../shared/report';


type Options = {
    readonly metafile: string;
    readonly files: readonly string[];
};

export const command: string = 'distinct-chunks <metafile> [files...]';
export const desc: string = 'Test that the source files were bundled into distinct chunks';


export const builder: CommandBuilder<Options, Options> = (
    (yargs: any) => yargs
        .positional('metafile', { type: 'string', demandOption: true })
        .positional('files', { type: 'string', demandOption: true })
) as CommandBuilder<Options, Options>;


export const handler = (argv: Arguments<Options>): void => {
    const report = new Report(argv.metafile);
    const stats = ChunkStats.fromReport(report, expandGlobs(argv.files));
    console.log(stats.summary);
    const multiples = stats.filesInSameChunk;
    if (multiples.length === 0) {
        console.log('All source files are in distinct chunks');
        process.exit(0);
    } else {
        console.log('The following chunks bundled multiple files:');
        for (const [chunk, files] of multiples) {
            console.log(`  * chunk: ${chunk}`);
            for (const file of files)
                console.log(`      - ${file}`);
        }
        console.error(`${multiples.length} chunks were not split`);
        process.exit(1);
    }
};
