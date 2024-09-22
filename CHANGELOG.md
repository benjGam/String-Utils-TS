# VERSION 2.0.0

- [Added] Unit testing is now part of this project.
- [Added] [docs] TSDoc has been adopted and is now part of this project.
- [Performance] Code has been reworked to improve performance (A performance measurer should be implemented in next realases)

## StringUtils class

- [Removed][BREAKING CHANGES] Following methods has been removed from this class:
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
- [Added] `isBlank(str: string): string` method has been added to check if a given string is empty / blank.
- [Added] `replaceAt(str: string, index: number, toReplaceWith: string): string` method has been added to replace a subsequence of a given string at the given index.
