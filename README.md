# `eslint-changeset`

Runs [ESLint](https://eslint.org/) on changed files.

## Why

Linting an entire project can be slow and some of the results may not be relevant.
Oftentimes, we only care about linting the files that have changed.

This project contains a script that will run ESLint on a list of changed files.

## Usage

### `npm`

```bash
npx eslint-changeset
```

### `yarn@1` (`yarn classic`)

```bash
yarn add --dev eslint-changeset
```

`package.json`

```json
{
  "scripts": {
    "eslint-changeset": "eslint-changeset"
  }
}
```

```bash
yarn eslint-changeset
```

### `yarn@2` (`yarn berry`)

```bash
yarn dlx eslint-changeset
```

## CLI

### `--branch=<branch>`

Accepts a git branch. Default `master`.

Compare changes with the specified branch.

### `--fix`

Accepts a boolean.

Automatically fix problems.

### `--since=<ref>`

Accepts a git ref.

Compare changes since the specified reference.
