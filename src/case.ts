import CamelCase from './case/camel-case';
import Case from './case/Case';
import LowerCase from './case/lower-case';
import PascalCase from './case/pascal-case';
import SnakeCase from './case/snake-case';
import UpperCase from './case/upper-case';
import { StringUtils } from './main';

/**
 * This type is used to ensure case selection is reliable
 */
export type CaseName =
  | 'SnakeCase'
  | 'PascalCase'
  | 'LowerCase'
  | 'UpperCase'
  | 'CamelCase';

/**
 * This table store few basics cases.
 *
 * @method StringUtilsCase.determineCase <- Use it
 */
const knownCases: Case[] = [
  new SnakeCase(),
  new PascalCase(),
  new LowerCase(),
  new UpperCase(),
  new CamelCase(),
];

export default class StringUtilsCase {
  /**
   * Returns the case with which parameters was written.
   *
   * @param {string} str - The string to test to determine case
   *
   * @returns {ICase} - The case of given string
   */
  public static determineCase(str: string): Case | undefined {
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
  public static convertToCase(str: string, caseToConvert: CaseName): string {
    switch (caseToConvert) {
      case 'LowerCase':
        return this.convertToCaseLogic('LowerCase', str);
      case 'UpperCase':
        return this.convertToCaseLogic('UpperCase', str);
      case 'CamelCase':
        return this.convertToCaseLogic('CamelCase', str);
      case 'PascalCase':
        return this.convertToCaseLogic('PascalCase', str);
      case 'SnakeCase':
        return this.convertToCaseLogic('SnakeCase', str);
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
    return this.convertToCaseLogic('CamelCase', str);
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
    return this.convertToCaseLogic('PascalCase', str);
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
    return this.convertToCaseLogic('SnakeCase', str);
  }

  private static convertToCaseLogic(toCase: CaseName, str: string): string {
    const correspondantKnowCase = knownCases.find(
      (caseInstance: Case) => caseInstance.name == toCase,
    );

    if (!StringUtils.isConsiderableCharSequence(str)) return str;

    if (!str.includes(' ')) {
      if (!this.determineCase(str)) return str;

      return correspondantKnowCase.basicConversionReturnFn(
        this.splitByCase(str),
        str,
      );
    }

    const removedBlankChars = StringUtils.removeBlankChars(str);
    if (this.determineCase(removedBlankChars).name == toCase) {
      return removedBlankChars;
    }

    return correspondantKnowCase.blendedConversionReturnFn(
      this.splitByCase(str),
      StringUtils.blendIrrelevantStringsInRelevantOnes(str),
      str,
    );
  }
}
