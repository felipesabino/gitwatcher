'use strict';

var _ = require('lodash');

//gets output and formats data to an object array
// the output should have the format as the output of
// the command $ git diff --name-status <COMMIT>
module.exports = function(logStream) {

  var result = [],
      source = (logStream || '').split('\n'),
      i,
      split;

  for (i = 0; i < source.length; ++i) {

    split = source[i].split('\t');
    if (split.length === 2) {
      result.push({
        status: split[0],
        file: split[1]
      });
    }
  }
  return {
    files: result
  };
};
