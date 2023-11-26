#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as isLazy from './commands/is-lazy';
import * as distinctChunks from './commands/distinct-chunks';
import { builder as distinctChunksBuilder } from './commands/distinct-chunks';

yargs(hideBin(process.argv))
    .command(isLazy.command, isLazy.desc, isLazy.builder as any, isLazy.handler as any)
    .command('distinct-chunks <metafile> [files...]', distinctChunks.desc, distinctChunksBuilder as any, distinctChunks.handler as any)
    // .command([isLazy, distinctChunks] as any)
    .demandCommand()
    .strict()
    .alias({ h: 'help' })
    .argv;
