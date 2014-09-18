'use strict';

var _ = require('lodash');

// [modifiedFiles] : array
//  file: string
//  status: string
//
// [options] : object
//  ignoreAdded: bool
//
// modifiedFiles: [modifiedFiles]
// protectedFiles: array
// options: [options]
module.exports = function(modifiedFiles, protectedFiles, options) {

  options = options || {
    ignoreAdded: false
  };

  var chain = _.chain(modifiedFiles);
  if (options.ignoreAdded) {
    chain = chain.reject(function(elem) {
      return elem.status.toUpperCase() === 'A';
    });
  }
  var filesToCheck = chain.pluck('file').value();

  var redflags = _.intersection(filesToCheck, protectedFiles);

  return {
    checked: filesToCheck,
    redflags: redflags
  };

};
