import { ICase, knownCases } from './case';
import {
  IWordEnding,
  unorderedWordEndings,
  wordEndings,
} from './word-ending-utils';

export class StringUtils {
  /**
   * Returns the case with which parameters was written.
   *
   * @param {string} str - The string to test to determine case
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
    const caseOfString = this.determineCase(str);

    if (!caseOfString) return [str];

    return str
      .split(caseOfString.splitter)
      .filter((subSequence) => !this.isBlank(subSequence));
  }

  /**
   * Check if a given string is blank or not
   *
   * @param {string} str - To check if it's blank
   * @returns {boolean}
   */
  public static isBlank(str: string): boolean {
    return str.trim().replaceAll(' ', '').length == 0;
  }

  /**
   * Returns corresponding ending, if it's ending stored in 'unorderedWordEndings' table
   *
   * @param {string} word - Should be a word
   * @example
   * word: 'Passes'
   * returns: 'es'
   * @example
   * word: 'Pass'
   * returns: 's'
   */
  public static getWordEnding(word: string): string {
    return unorderedWordEndings.find((ending) => word.endsWith(ending));
  }

  /**
   * Returns the complete IWordEnding object corresponding
   *
   * @param {string} word - Should be a word
   */
  public static getCorrespondingEnding(word: string): IWordEnding {
    return null;
  }

  /**
   * Check the ending form of a word and return a boolean
   *
   * @param {string} str - String to check if it's plural or not (should be a word)
   * @example
   * str: Tests
   * returns: true
   * @example
   * str: Category
   * returns: false
   * @returns {boolean} - true if given string ending is plural, false otherwise
   */
  public static isPlural(str: string): boolean {
    return (
      !!wordEndings.find((ending) => str.endsWith(ending.pluralForm)) &&
      !str.endsWith('ss')
    );
  }

  /**
   * Check the ending form of a word and return a boolean
   *
   * @param {string} str - String to check if it's singular or not (should be a word)
   * @example
   * str: Test
   * returns: true
   * @example
   * str: Categories
   * returns: false
   * @returns {boolean} - true if given string ending is singular, false otherwise
   */
  public static isSingular(str: string): boolean {
    return !this.isPlural(str); //Should work fine :x (I'm factually right.)
  }

  /**
   * Return pluralized version of the given word
   *
   * @param {string} word - Should be a word
   * @example
   * word: Pass
   * returns: Passes
   */
  public static pluralize(word: string): string {
    return '';
  }
}
