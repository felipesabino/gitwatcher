'use strict';

var should = require('chai').should(),
    logparser = require('../lib/git-log-parser');

describe('git log parser', function() {

  it('should return empty array if empty string is provided', function() {

    var parse = logparser('');
    parse.should.have.property('files').with.length(0);

  });

  it('should return empty array if no argument is provided', function() {

    var parse = logparser();
    parse.should.have.property('files').with.length(0);

  });

  it('should return parse "git log --name-status --oneline" output format', function() {

    var input = 'M\tpath/to/modified/file\nA\tpath/to/added/file';
    var parse = logparser(input);

    parse.should.have.property('files')
      .with.length(2)
      .include({
        status: 'M',
        file: 'path/to/modified/file'
      })
      .include({
        status: 'A',
        file: 'path/to/added/file'
      });
  });

  it('should ignore log line entries with no tabulation', function() {
    var input = 'M\tpath/to/modified/file\n342a02d fixed something'; // if there is no grep by status (e.g. " egrep "^[MAD]\t.", the commit messages would also be provided, we are ignoring this value now)
    var parse = logparser(input);

    parse.should.have.property('files')
      .with.length(1)
      .include({
        status: 'M',
        file: 'path/to/modified/file'
      });
  });

});
