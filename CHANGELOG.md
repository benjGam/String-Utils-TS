# Version 2.5.4

- `Patch`:
  - Paths are patched.

# Version 2.5.0

- `Added`:
  - `getFirstCharIndex(string: string): number` method has been implemented.
  - `normalizeSentence(sentence: string): string` method has been implemented, this method is used to upper the first word char & lower the rest of them & append a dot at the end of it.
  - `getFirstCharIndex(string: string)` method has been implemented.
  - `getFirstEndingPunctuationIndex(string: string): number` method has been implemented.
  - `getIndexOfUnfullyDeterminated(string: string, toSearch: string | string[]): number` method has been implemented to get the first index of a given set of (only one) char in a given string.

# Version 2.4.1

- `Patch`:
  - Remove useless files from package (When `npm publish` is performed)

# Version 2.4.0

- `Added`:
  - `WordEnding` class has been implemented to replace `IWordEnding` interface.
  - `getPluralOf(str: string): string`, `getSingularOf(str: string): string` methods has been implemented to get respectively `plural` & `singular` form of a given one.
- `Removed` [BREAKING CHANGES]:
  - `IWordEnding` interface has been removed.

# Version 2.3.1

- `Fixes`:
  - Exports for cases component are now availables.

# Version 2.3.0

- `Enhancement`:
  - `Case conversion`: Previously algorithms responsible of converting a string to another case was obviously to light, so, the range of managed uses was too poor, i reworked those algorithms and they're now better from far that was they were. The new ones got tested and passes tests, it's more than sure that i didn't test all of cases, but an enhancement of this feature is truely brang to package.
- `Added`:
  - `Case` abstract class is now used to reliably create case objects.
    - `CamelCase` class implement logic of previous correspondant object.
    - `PascalCase` class implement logic of previous correspondant object.
    - `SnakeCase` class implement logic of previous correspondant object.
    - `LowerCase` class implement logic of previous correspondant object.
    - `UpperCase` class implement logic of previous correspondant object.
  - `StringUtils (main.ts)`
    - `isConsiderableCharSequence(str: string): boolean` method has been implemented and used to check if a given string contains atleast 2 chars (excepted blanks ones).
    - `containsConsiderableCharSequence(stringTable: string[]): boolean` method has been implemented and used to check if a given table of string contains atleast one considerable (determined by `isConsiderableCharSequence` criterias) element.
    - `containsOnlyConsiderableCharSequences(stringTable: string[]): boolean` method has been implemented and used to check if a given table of string contains only considerable (determined by `isConsiderableCharSequence` criterias) elements.
    - `removeBlankChars(str): string` method has been implemented and could be use to remove blank chars from a given string.
    - `blendIrrelevantStringsInRelevantOnes(str: string): string[]` method has been implemented and should be used to blend orphan chars (a char adjacent to blank chars) to the last considerable subsequence of char (determined by `isConsiderableCharSequence` criterias) in a given string.
- `Removed`:
  - `[BREAKING CHANGES]`:
    - `Case` type has been renamed `CaseName` to avoid collision between new `Case` object type and previous `Case` type.
    - `ICase` interface has been removed, it was useless to keep working with it.
- `Refactor`:
  - `[BREAKING CHANGES]`:
    - `determineCase(str: string): ICase` method signature changed to `determineCase(str: string): Case`.
  - `convertToCase(str: string, caseToConvert: Case): string` method signature moved to `convertToCase(str: string, caseToConvert: CaseName): string`.
  - `knownCases` table is now a `:Case[]` instead of `:ICase[]`.
  - Tests has been refactored to avoid rewriting loops again and again, they now use `JestRunner` utils class.

# Version 2.2.0

- `Added`:
  - `StringUtilsWord.formatWords(toFormat: string | string[])` apply `StringUtilsWord.formatWord(str)` to a complete sentence or table of words.

# Version 2.1.0

- `Fixes`:
  - `StringUtilsCase.splitByCase()` method doesn't remove spaces anymore while splitting `lowercase` and `uppercase` formed strings.
- `Added`:
  - `type Case` is now provided to reliably link managed cases.
  - `StringUtilsCase.convertToCase(str: string, caseToConvert: Case)` has been implemented.

# Version 2.0.0

- Added:
  - Unit testing is now part of this project.
  - TSDoc has been adopted and is now part of this project.
  - Code quality components are now part of this project (ESLint & Prettier)
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
  - `splitByCase();` - a reworked and renamed version of previous `StringUtils.splitByCasing();` method.

## StringUtilsWord class

- Added:
  - `getWordEnding();` - a reworked version in term of performance of previous `StringUtils.getEnding();` method.
  - `getCorrespondingEnding();` - a useful internal method, but also heaviest than `getWordEnding();`, it works like previous `StringUtils.getEnding();` method.
  - `isPlural();` - [FIX] Bring a fix to case where provided words ended with `ss`, there's no confusion, method now manage those cases.
  - `isSingular();`, `pluralize();`, `singularize();` - moved from `StringUtils` to `StringUtilsWord` class.
  - `formatWord();` - has been reworked and now use `StringUtils.replaceAt();` method to optimize process.
  - `normalizeSpacesBetweenWords();` - to be rework in next release.
