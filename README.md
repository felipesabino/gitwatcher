# Git Watcher

[![Build Status](https://travis-ci.org/felipesabino/git-watcher.svg?branch=master)](https://travis-ci.org/felipesabino/git-watcher)

Watches you git commit files and warns you if somebody modified, removed or added a file that was blacklisted.

It was done to be initially used together with [travis-ci](https://travis-ci.org), but can be used with other CI tools as well, as long it complies to the following requirements:

- has nodejs environment
- allow to install npm packages
- access to build current commit or commit range ids

## Using

### Instalation

TODO: * add npm instalation - will be added after npm publishing and setup

TODO: * add source instalation - will be added after git repo setup

### Configuration

Add a config file to your project (the default path is `./.gitwatcher.json` but can be changed in runtime) and add your list of files to be watched there.

There is a [sample file](gitwatcher.sample.json) in the repo that can be used as a template for that.

#### Testing locally

Execute to get a list of files that were modified and should not have been.

```
$ git-watcher-files --commit SHA1..SHA2
```

This *SHA1..SHA2* can be the same format used by [github's compare view url ](https://github.com/blog/612-introducing-github-compare-view) or [travi's *TRAVIS_COMMIT_RANGE* environment variable](http://docs.travis-ci.com/user/ci-environment/#Environment-variables)

Hint: You can easily check the files modified by each commit using `$ git log --name-status`


### Travis-CI configuration

Add the following line to the `before_install` section in your `.travis.yml` file

```
git-watcher-files --commit $TRAVIS_COMMIT_RANGE
```

If you have a configuration file in a location other than `./.gitwatcher.json`, use like the following:

```
git-watcher-files --commit $TRAVIS_COMMIT_RANGE --options path/to/configuration.file
```

## Developers

After cloning this repo you must run `npm install`

Then you can run the tests:

```
$ npm run test
$ npm run lint
```

Or execute locally with `npm link`

```
$ npm link
$ git-watcher-files -h
```

### Contributing

Just fork and send me your pull request

## Remarks

First step trying to improve stability and maintainability of large git repository with lots of contributors.

## License

[License](LICENSE.md)
