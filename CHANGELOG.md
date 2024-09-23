# VERSION 2.0.0

- [ADDED] Unit testing is now part of this project.
- [ADDED] [DOCS] TSDoc has been adopted and is now part of this project.
- [PERFORMANCE] Code has been reworked to improve performance (A performance measurer should be implemented in next realases)

## StringUtils class

- [REMOVED][BREAKING CHANGES] Following methods has been removed from this class:
  - `singularize();`
  - `pluralize();`
  - `formatWord();`
  - `formatEachWords();`
  - `getEnding();`
  - `isPlural();`
  - `isSingular();`
  - `removeEndDuplications();`
  - `resolveCase();`
  - `splitByCasing();`
  - `normalizeSpaces();`
  - `isUpper();`
  - `isLower();`
  - `getPluralOf();`
  - `getSingularOf();`
- [ADDED] `isBlank(str: string): string` method has been added to check if a given string is empty / blank.
- [ADDED] `replaceAt(str: string, index: number, toReplaceWith: string): string` method has been added to replace a subsequence of a given string at the given index.

## StringUtilsCase class

- [ADDED] This class was added to separate concerns, this class is now responsible of managing case operations, checking, etc.
- [ADDED] Following methods has been added to this class:
  - `determineCase();`
  - `splitByCase();` - just a reworked and renamed version of previous `StringUtils.splitByCasing();`.
