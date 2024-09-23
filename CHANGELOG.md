# VERSION 2.0.0

- Added:
  - Unit testing is now part of this project.
  - TSDoc has been adopted and is now part of this project.
- Performance:
  - Code has been reworked to improve performance (**A performance measurer should be implemented in next realases**)

## StringUtils class

- Removed: [**BREAKING CHANGES**]
  - `singularize();`, `pluralize();`, `formatWord();`, `formatEachWords();`, `getEnding();`, `isPlural();`, `isSingular();`, `removeEndDuplications();`, `resolveCase();`, `splitByCasing();`, `normalizeSpaces();`, `isUpper();`, `isLower();`, `getPluralOf();`, `getSingularOf();` methods has been removed.
- Added:
  - `isBlank(str: string): string` method has been added to check if a given string is empty / blank.
  - `replaceAt(str: string, index: number, toReplaceWith: string): string` method has been added to replace a subsequence of a given string at the given index.

## StringUtilsCase class

- Added:
  - `determineCase();`
  - `splitByCase();` - a reworked and renamed version of previous `StringUtils.splitByCasing();`.

## StringUtilsWord class

- Added:
  - `getWordEnding();` - a reworked version in term of performance of previous `StringUtils.getEnding();` method.
  - `getCorrespondingEnding();` - a useful internal method, but also heaviest than `getWordEnding();`, it works like previous `StringUtils.getEnding();` method.
  - `isPlural();` - [FIX] Bring a fix to case where provided words ended with `ss`, there's no confusion, method now manage those cases.
  - `isSingular();`, `pluralize();`, `singularize();` - moved from `StringUtils` to `StringUtilsWord` class.
  - `formatWord();` - has been reworked and now use `StringUtils.replaceAt();` method to optimize process.
  - `normalizeSpacesBetweenWords();` - to be be rework in next release.
