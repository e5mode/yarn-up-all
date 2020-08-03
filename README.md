# yarn-up-all

![GitHub package.json version](https://img.shields.io/github/package-json/v/e5mode/yarn-up-all)
![GitHub](https://img.shields.io/github/license/e5mode/yarn-up-all)
![GitHub Releases](https://img.shields.io/github/downloads/e5mode/yarn-up-all/1.0.1/total)

## Description

This is a Yarn2 (Berry) plugin that will update all dependencies of a project with one simple command.

### Installation

```Bash
yarn plugin import https://github.com/e5mode/yarn-up-all/releases/download/1.0.1/index.js
```

### Usage

To update all dependencies (including `devDependencies`), run:

```Bash
yarn up-all
```

To exclude a single dependency, run:
```Bash
yarn up-all --exclude package
```

To exclude multiple dependencies:
```Bash
yarn up-all --exclude "package1 package2"
```
