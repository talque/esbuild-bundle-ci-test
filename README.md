Webpack Bundle CI Test
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

Webpack can output bundling stats, including which file goes into
which output chunk. The [webpack bundle
analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
can turn that into a pretty picture of what is in which
bundle. Fortunately, bundle analyzer can also output the same data as
another json file. This repository adds a script to query the output
`report.json` to check that

1. given a list of files/globs, verify that all are lazily loaded
   (i.e. not in `main.js`)

2. given a list of files/globs, verify that they are bundled into
   distinct chunks


Usage
-----

First you need the `stats.json` from the webpack build. How to get
this depends on your build system, see the next section for some
examples. Then call the webpack bundle analyzer to convert it to the
`report.json`:

    webpack-bundle-analyzer dist/stats.json --mode json --report dist/report.json

For the first type of check you can run, ideally as part of your testsuite,

    webpack-bundle-ci-test is-lazy dist/report.json path/a.ts path/b.ts path/c.ts

to check that the code from the three files `path/a.ts`, `path/b.ts`,
and `path/c.ts` is lazily loaded.

For the second type of check you can run

    webpack-bundle-ci-test distinct-chunks dist/report.json path/a.ts path/b.ts path/c.ts

to verify that the three files were bundled into three distinct
chunks, one of which may or may not have been `main.js`.

In either case, if the test fails a non-zero exit code is returned
which should cause your testsuite to fail.


How to generate webpack stats
-----------------------------

This depends on how you are using webpack in your build proccess. If
you call webpack directly in your build process, add

    webpack --profile --json=compilation-stats.json

If you are using the Angular CLI, build with the

    ng build --stats-json

flag and webpack will be called with the appropriate flags internally.