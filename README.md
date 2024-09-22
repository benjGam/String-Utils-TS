# String Utils TS

This repository hosts the source code of [String Utils TS](https://www.npmjs.com/package/string-utils-ts) node module.

## Motivations

The motivation behind this project is that is so sleepy and annoying to do operations on string, so, i decided to put all that concerns into an single module to solve all the problematics encountered in string management, operations, verifications etc.

So, we have now a basic module with few features that helps third-party developpers to handle some annoying cases.

Firstly, this package (c.f 1.x.x versions) was messy, no tests, no clean code and other stuffs. But i saw in this package, a way to improve myself as developer. So the new version will be tested, subject to CI/CD process and i also added a changelog.

This package is a way to help third-party developers but also a way to help myself as developer.

(I'm pretty sure that kind of module already exists and are better than mine, but, in any case, it will be usefull to me)

## Features (2.0.0 version)

### StringUtilsWord class

This class is responsible of manage some operations on words, we have following features:

- `isPlural()`: This method is useful to know if a provided word is plural or not.
- `isSingular()`: This method check the opposite of `isPlural()` one.
- `pluralize()`: This method convert a provided singular word ending, to plural (i.e: Pass -> Passes).
- `singularize()`: This method do the opposite of `pluralize()` one.
- `formatWord()`: This method is useful if you want to convert a `word` -> `Word`, it could be useful, but it's an extremely rare case.
- `normalizeSpaceBetweenWords()`: This method is useful when you get a builded string from nowhere and you should ensure that there's no duplicated spaces in it.

### StringUtilsCase class

This class is responsible of manage some operations on case of strings, we have following features:

- `determineCase()`: This method could be useful if you want to know the case of a string (i.e: camelCase, snake_case, PascalCase, UPPERCASE, lowercase)
- `splitByCase()`: This method could be useful if you want to split a string cased as a certain way, but you want each terms separated in a table.
- `convertToCase()`: This method could be useful if you want to convert a string from a case to another one (Not implement yet)
