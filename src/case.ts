import { StringUtils } from './main';
import StringUtilsWord from './word';

/**
 * This interface provide a structure for literal objects
 * It brings reliable way to add unmanaged cases without any other code writing
 *
 * @interface ICase
 * @field {string} name is used to represent a matcher & splitter for case
 * @field {RegExp} matcher is used with Regex operations to check if a given string match
 * @field {RegExp | string} splitter is used to split given string who match `matcher`
 *
 */
interface ICase {
  name: Case;
  matcher: RegExp;
  splitter: RegExp | string;
  noBlendReturn: Function;
  blendedReturn: Function;
}

/**
 * This type is used to ensure case selection is reliable
 */

export type Case =
  | 'snakeCase'
  | 'pascalCase'
  | 'lowerCase'
  | 'upperCase'
  | 'camelCase';

/**
 * This table store few basics cases.
 *
 * @method StringUtilsCase.determineCase <- Use it
 */
const knownCases: ICase[] = [
  {
    name: 'snakeCase',
    matcher: /(\w+)_(\w+)/,
    splitter: '_',
    blendedReturn: (
      splittedByCase: string[],
      blended: string[],
      str: string,
    ) => {
      return blended.length <= 2
        ? StringUtilsCase.splitByCase(blended.join('')).join('_').toLowerCase()
        : StringUtilsWord.normalizeSpacesBetweenWords(
            blended.join('_'),
          ).toLowerCase();
    },
    noBlendReturn: (splittedByCase: string[], str: string) => {
      return splittedByCase.join('_').toLowerCase();
    },
  },
  {
    name: 'pascalCase',
    matcher: /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/,
    splitter: /([A-Z]+[a-z]*)/,
    blendedReturn: (
      splittedByCase: string[],
      blended: string[],
      str: string,
    ) => {
      return StringUtils.removeBlankChars(
        blended.length < 2
          ? StringUtilsWord.formatWord(str)
          : StringUtilsWord.formatWords(blended),
      );
    },
    noBlendReturn: (splittedByCase: string[], str: string) => {
      return StringUtils.removeBlankChars(
        !StringUtils.containsConsiderableCharSequence(splittedByCase)
          ? StringUtilsWord.formatWord(str)
          : StringUtilsWord.formatWords(splittedByCase),
      );
    },
  },
  {
    name: 'lowerCase',
    matcher: /^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
    splitter: '',
    blendedReturn: (
      splittedByCase: string[],
      blended: string[],
      str: string,
    ) => {
      return str.toLowerCase();
    },
    noBlendReturn: (splittedByCase: string[], str: string) => {
      return str.toLowerCase();
    },
  },
  {
    name: 'upperCase',
    matcher: /^[A-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
    splitter: '',
    blendedReturn: (
      splittedByCase: string[],
      blended: string[],
      str: string,
    ) => {
      return str.toUpperCase();
    },
    noBlendReturn: (splittedByCase: string[], str: string) => {
      return str.toUpperCase();
    },
  },
  {
    name: 'camelCase',
    matcher: /^[a-z]+(?:[A-Z][a-z]+)*$/,
    splitter: /([A-Z]+[a-z]*)/,
    blendedReturn: (
      splittedByCase: string[],
      blended: string[],
      str: string,
    ) => {
      return (
        blended.length < 2
          ? StringUtilsCase.splitByCase(StringUtils.removeBlankChars(str))
          : blended
      )
        .map((subSequence, index) =>
          index == 0
            ? subSequence.toLowerCase()
            : StringUtilsWord.formatWord(subSequence),
        )
        .join('');
    },
    noBlendReturn: (splittedByCase, str) => {
      return splittedByCase
        .map((subSequence, index) =>
          index == 0
            ? subSequence.toLowerCase()
            : StringUtilsWord.formatWord(subSequence),
        )
        .join('');
    },
  },
];

export default class StringUtilsCase {
  /**
   * Returns the case with which parameters was written.
   *
   * @param {string} str - The string to test to determine case
   *
   * @returns {ICase} - The case of given string
   */
  public static determineCase(str: string): ICase | undefined {
    return knownCases.find((caseObject) => caseObject.matcher.test(str));
  }

  /**
   * Returns a table of strings, split operation is based on case used
   * in the given string
   *
   * @param {string} str - String with cased content
   *
   * @example
   * str: thisIsMyString
   * returns: ['this', 'Is', 'My', 'String']
   * @example
   * str: This is a test
   * returns: ['This is a test']
   * @returns {string[]}
   */
  public static splitByCase(str: string): string[] {
    const stringCase = this.determineCase(str);

    if (!stringCase) return [str];

    return str.split(stringCase.splitter).filter((subSequence) => subSequence);
  }

  /**
   * Returns a given string converted to targetedCase
   *
   * @param {string} str - The string to convert
   * @param {Case} caseToConvert - The case to convert
   *
   * @example
   * str: thisIsATest
   * case: snakeCase
   * returns: this_is_a_test
   */
  public static convertToCase(str: string, caseToConvert: Case): string {
    switch (caseToConvert) {
      case 'lowerCase':
        return this.convertToCaseLogic('lowerCase', str);
      case 'upperCase':
        return this.convertToCaseLogic('upperCase', str);
      case 'camelCase':
        return this.convertToCaseLogic('camelCase', str);
      case 'pascalCase':
        return this.convertToCaseLogic('pascalCase', str);
      case 'snakeCase':
        return this.convertToCaseLogic('snakeCase', str);
    }
  }

  /**
   * Returns a given string converted to camelCase
   *
   * @param {string} str - The string to convert
   *
   * @example
   * str: ThisIsMyExample
   * returns: thisIsMyExample
   * @example
   * str: thisIsMyExample
   * returns: thisIsMyExample
   */
  public static toCamelCase(str: string): string {
    return this.convertToCaseLogic('camelCase', str);
  }

  /**
   * Returns a given string converted to PamelCase
   *
   * @param {string} str - The string to convert
   *
   * @example
   * str: ThisIsMyExample
   * returns: ThisIsMyExample
   * @example
   * str: thisIsMyExample
   * returns: ThisIsMyExample
   */

  public static toPascalCase(str: string): string {
    return this.convertToCaseLogic('pascalCase', str);
  }

  /**
   * Returns a given string converted to snakeCase
   *
   * @param {string} str - The string to convert
   *
   * @example
   * str: ThisIsMyExample
   * returns: this_is_my_example
   * @example
   * str: thisIsMyExample
   * returns: this_is_my_example
   */
  public static toSnakeCase(str: string): string {
    return this.convertToCaseLogic('snakeCase', str);
  }

  private static convertToCaseLogic(toCase: Case, str: string): string {
    const correspondantKnowCase = knownCases.find(
      (caseObject) => caseObject.name == toCase,
    );

    const [noBlendReturnFn, blendedReturnFn] = [
      correspondantKnowCase.noBlendReturn,
      correspondantKnowCase.blendedReturn,
    ];

    if (!StringUtils.isConsiderableCharSequence(str)) return str;

    if (!str.includes(' ')) {
      if (!this.determineCase(str)) return str;

      return noBlendReturnFn(this.splitByCase(str), str);
    }

    const removedBlankChars = StringUtils.removeBlankChars(str);
    if (this.determineCase(removedBlankChars).name == toCase) {
      return removedBlankChars;
    }

    return blendedReturnFn(
      this.splitByCase(str),
      StringUtils.blendIrrelevantStringsInRelevantOnes(str),
      str,
    );
  }
}
