#!/usr/bin/env node

'use strict';

var util    = require('util'),
    exec    = require('child_process').exec,
    colors  = require('colors'),
    _       = require('lodash'),
    path    = require('path'),
    yargs   = require('yargs');

var logparser   = require('../lib/git-log-parser'),
    filechecker = require('../lib/file-checker');

var defaultOptionsFile = '.gitwatcher.json';

var argv = yargs
      .options('v', {
        alias: 'verbose',
        describe: 'verbose'
      })
      .options('q', {
        alias: 'quiet',
        describe: 'quiet'
      })
      .options('c', {
        alias: 'commit',
        describe: 'Commit (ex: 1617cf1) or commit range (ex: 1617cf1..beb2e7e)',
        require: true
      })
      .options('o', {
        alias: 'options',
        describe: 'options json file path. File is required',
        default: defaultOptionsFile
      })
      .options('i', {
        alias: 'ignore-added',
        describe: 'Ignore added files. This flag makes script care for modified/deleted files on git history',
        default: false
      })
      .argv;

var options = null;
try {
  if (argv.options == defaultOptionsFile) {
    options = path.join(process.cwd(), defaultOptionsFile)
  }
  else {
    options = require(argv.options);
  }
  console.log(options);
  if(!_.isArray(options.files.list)) { throw "file list format is invalid"; }
}
catch (e) {
  console.log(util.format('git-watcher: error opening options json file.\n%s', e).red);

  yargs.showHelp();
  process.exit(1);
}
var command = util.format('git log --name-status --oneline %s | egrep "^[MAD]\t."', argv.commit);
var diff = exec(command,
  function (error, stdout, stderr) {

    var protectedfiles = options.files.list;

    //gets output and formats data to an object array
    var parsed = logparser(stdout).files;

    // compares each file to config array
    var checker = filechecker(parsed, protectedfiles, {ignoreAdded: (argv['ignore-added'] || options.files['should-ignore-added'] )});

    // only output files that are being checked if in verbose mode
    if (argv.verbose) {
      console.log('git-watcher: files that will be checked from commits:\n');
      console.log(checker.checked.join('\n')+ '\n');

      console.log('git-watcher: file list to be checked against:\n');
      console.log(protectedfiles.join('\n')+ '\n');
    }

    if (checker.redflags.length > 0) {
      if (!argv.quiet || argv.verbose) {
        console.log('git-watcher: some files should not have been modififed.'.red);
        console.log('git-watcher: please revert you changes and commit again.'.red);
        console.log(checker.redflags.join('\n').yellow + '\n');

      }
      process.exit(1);
    }
    else {
      if (!argv.quiet || argv.verbose) {
        console.log('git-watcher: everything ok, no files matched for the provided commits.\n'.green);
      }
      process.exit(0);
    }
});
