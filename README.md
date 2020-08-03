# yarn-up-all

## Description

This is a Yarn2 (Berry) plugin that will update all dependencies of a project with one simple command.

### Installation

```Bash
yarn plugin import https://github.com/e5mode/yarn-up-all/blob/master/src/index.js
```

### Usage

To update all plugins (including `devDependencies`), run:

```Bash
yarn up-all
```

To exclude a dependency, run
```Bash
yarn up-all --exclude package
```

To exclude multiple dependencies:
```Bash
yarn up-all --exclude "package1 package2"
```
