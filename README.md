Esbuild Bundle CI Test
======================

About
-----

It is quite easy to break lazy-loading. For example, all it takes is
for someone to carelessly import something from a lazy-loaded module
into the app module and this module is eagerly loaded.

Checking that appropriate chunks are created can be done manually, but
we would like to automate this repetitive task in our CI
pipeline. This cli script lets you programmatically check if
lazy-loading works for all lazy-loaded modules.

See also https://stackoverflow.com/questions/73150132/programmatically-check-if-lazy-loading-works


Theory of operation
-------------------

Esbuild can output bundling stats, including which file goes into
which output chunk. This repository adds a script to query the output
`meta.json` to check that

1. given a list of files/globs, verify that all are lazily loaded
   (i.e. not in `main.js`)

2. given a list of files/globs, verify that they are bundled into
   distinct chunks


Usage
-----

First you need the metafile `meta.json` from esbuild. How to get this
depends on your build system, see the next section for some
examples. For the first type of check you can run, ideally as part of
your testsuite,

    esbuild-bundle-ci-test is-lazy dist/meta.json path/a.ts path/b.ts path/c.ts

to check that the code from the three files `path/a.ts`, `path/b.ts`,
and `path/c.ts` is lazily loaded.

For the second type of check you can run

    esbuild-bundle-ci-test distinct-chunks dist/meta.json path/a.ts path/b.ts path/c.ts

to verify that the three files were bundled into three distinct
chunks, one of which may or may not have been `main.js`.

In either case, if the test fails a non-zero exit code is returned
which should cause your testsuite to fail.


How to generate esbuild stats
-----------------------------

This depends on how you are using esbuild in your build proccess. If
you call esbuild directly in your build process, add

    esbuild app.js --bundle --metafile=meta.json --outfile=out.js

If you are using the Angular CLI, build with the

    ng build --stats-json

flag and esbuild will be called with the appropriate flags internally.
