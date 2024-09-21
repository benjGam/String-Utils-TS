import { ICase, knownCases } from './case';

export class StringUtils {
  /**
   * This object is used to list plural and singular forms
   * of words. It's used to do some operations on given
   * words.
   */
  private static wordPluralAndSingularEndingFormsObject = {
    sses: 'ss',
    ies: 'y',
    es: 'e',
    s: '',
  };

  /**
   * This object is used to avoid concat operation
   * to optimize performance
   */
  private static completePluralAndSingularEndingFormsTable = Object.keys(
    this.wordPluralAndSingularEndingFormsObject,
  ).concat(Object.values(this.wordPluralAndSingularEndingFormsObject));

  /**
   * Returns the case with which parameters was written.
   *
   * @param str - The string to test to determine case
   *
   * @returns {ICase} - The case of given string
   */
  public static determineCase(str: string): ICase | undefined {
    return knownCases.find((caseObject) => str.match(caseObject.matcher));
  }

  /**
   * Returns a table of strings, split operation is based on case used
   * in the given string
   *
   * @param str - String with cased content
   *
   * @example
   * ```
   * str: thisIsMyString
   * returns: ['this', 'Is', 'My', 'String']
   * ```
   *
   * @example
   * ```
   * str: This is a test
   * returns: ['This is a test']
   * ```
   * @returns {string[]}
   */
  public static splitByCase(str: string): string[] {
    const caseOfString = this.determineCase(str);

    if (!caseOfString) return [str];

    return str
      .split(caseOfString.splitter)
      .filter((subSequence) => !this.isBlank(subSequence));
  }

  /**
   * Check if a given string is blank or not
   *
   * @param str
   * @returns {boolean}
   */
  public static isBlank(str: string): boolean {
    return str.trim().replaceAll(' ', '').length == 0;
  }

  /**
   * Check the ending form of a word and return a boolean
   *
   * @param str - String to check if it's plural or not (should be a word)
   *
   * @example
   * ```
   * str: Tests
   * returns: true
   * ```
   * @example
   * ```
   * str: Category
   * returns: false
   * ```
   *
   * @returns {boolean} - true if given string ending is plural, false otherwise
   */
  public static isPlural(str: string): boolean {
    return true;
  }
}
