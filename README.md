# Git Watcher

[![Build Status](https://travis-ci.org/felipesabino/gitwatcher.svg?branch=master)](https://travis-ci.org/felipesabino/gitwatcher)

Watches you git commit files and warns you if somebody modified, removed or added a file that was blacklisted.

It was done to be initially used together with [travis-ci](https://travis-ci.org), but can be used with other CI tools as well, as long it complies to the following requirements:

- has nodejs environment
- allow to install npm packages
- access to build current commit or commit range ids

## Using


### Configuration

Add a config file to your project, the default path is `.gitwatcher.json` but can be changed in runtime using the `--option`, then add your list of files to be watched there.

There is a [sample file](gitwatcher.sample.json) in the repo that can be used as a template for that.


### Travis-CI Instalation and Usage

There are several ways of installing and using in your project. There are some examples bellow and a [demo project here](https://github.com/felipesabino/gitwatcher-examples) to check the usage.

#### using npm global instalation:

Add the following code to the `before_install` section of yout `.travis.yml` file

```
- npm install -g gitwatcher
- git-watcher-files --commit $TRAVIS_COMMIT_RANGE
```

#### using source directly and [npm link](https://www.npmjs.org/doc/cli/npm-link.html)

Add the following lines to the `before_install` section of your `.travis.yml`

```
- git clone https://github.com/felipesabino/gitwatcher
- cd gitwatcher
- npm install
- npm link
- cd ..
- git-watcher-files --commit $TRAVIS_COMMIT_RANGE
```

#### using as devDependency in your `package.json` (only for node.js apps)

Add `gitwatcher` dependency to your package.json `devDependencies` section

```
...
  "devDependencies": {
    "gitwatcher": "*"
  }
...
```
And then the following code to the `before_script` section of yout `.travis.yml` file
```
- ./node_modules/.bin/git-watcher-files --commit $TRAVIS_COMMIT_RANGE
```
**Important**: Notice that the instalation using devDependency needs the script to be added to  **`before_script`** as it will depend on an `npm install` which travis does automatically at the `install` step. Check the [build lifecycle documentation](http://docs.travis-ci.com/user/build-lifecycle/) for more information.



#### Testing locally

Execute to get a list of files that were modified and should not have been.

```
$ git-watcher-files --commit SHA1..SHA2
```

This *SHA1..SHA2* can be the same format used by [github's compare view url ](https://github.com/blog/612-introducing-github-compare-view) or [travi's *TRAVIS_COMMIT_RANGE* environment variable](http://docs.travis-ci.com/user/ci-environment/#Environment-variables)

Hint: You can easily check the files modified by each commit using `$git diff --name-status`


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
