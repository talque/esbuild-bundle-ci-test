import type { Arguments, CommandBuilder } from 'yargs';
import { ChunkStats } from '../shared/chunk-stats';
import { expandGlobs } from '../shared/expand-globs';
import { Report } from '../shared/report';


type Options = {
    readonly reportJson: string;
    readonly files: readonly string[];
};

export const command: string = 'is-lazy <reportJson> [files...]';
export const desc: string = 'Test that the code from the given files is lazily loaded';


export const builder: CommandBuilder<Options, Options> = (
    (yargs: any) => yargs
        .positional('reportJson', { type: 'string', demandOption: true })
        .positional('files', { type: 'string', demandOption: true })
) as CommandBuilder<Options, Options>;


export const handler = (argv: Arguments<Options>): void => {
    const report = new Report(argv.reportJson);
    const stats = ChunkStats.fromReport(report, expandGlobs(argv.files));
    console.log(stats.summary);
    const files = stats.filesInMain;
    if (files.length === 0) {
        console.log('All source files are lazy loaded');
        process.exit(0);
    } else {
        console.log('The following files were not lazily loaded:');
        for (const file of files)
            console.log(`  * ${file}`);
        console.error(`${files.length} were not lazily loaded`);
        process.exit(1);
    }
};
