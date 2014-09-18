'use strict';

var should = require('chai').should(),
    filechecker = require('../lib/file-checker');

describe('file checker', function() {

  var logfiles;
  var protectedfiles;

  beforeEach(function() {
    logfiles = [
      {
        status: 'M',
        file: 'path/to/modified/file'
      },
      {
        status: 'D',
        file: 'path/to/deleted/file'
      },
      {
        status: 'A',
        file: 'path/to/added/file'
      }
    ];

    protectedfiles = [
      'path/to/added/file'
    ];
  });

  describe('red flags', function() {

    it('should return empty array for redflags when no protected files are provided', function() {

      var check = filechecker(logfiles, []);
      check.should.have.property('redflags').with.length(0);

    });

    it('should return matches for redflags comparing against protected files', function() {

      var check = filechecker(logfiles, protectedfiles);

      check.should.have.property('redflags')
        .with.length(1)
        .include('path/to/added/file');

    });

    it('should not return matches for redflags comparing against protected files if added and ignoreadded flag is provided', function() {

      var check = filechecker(logfiles, protectedfiles, {ignoreAdded: true});
      check.should.have.property('redflags').with.length(0);

    });

  });


  describe('filter by status', function () {

    it('should return empty array if status is not provided', function() {

      var check;
      
      check = filechecker(logfiles, []);
      check.should.have.property('checked').with.length(3);

      check = filechecker(logfiles, [], {ignoreAdded: false});
      check.should.have.property('checked').with.length(3);

    });

    it('should check against non-added status files', function() {

      var check = filechecker(logfiles, [], {ignoreAdded: true});

      check.should.have.property('checked')
        .with.length(2)
        .include('path/to/modified/file')
        .include('path/to/deleted/file');
    });

  });

});
