import { StringUtils } from './main';

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
  name: string;
  matcher: RegExp;
  splitter: RegExp | string;
}

/**
 * This table store few basics cases.
 *
 * @method StringUtils.determineCase <- Use it
 */
const knownCases: ICase[] = [
  {
    name: 'snakeCase',
    matcher: /(\w+)_(\w+)/,
    splitter: '_',
  },
  {
    name: 'pascalCase',
    matcher: /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/,
    splitter: /([A-Z]+[a-z]*)/,
  },
  {
    name: 'camelCase',
    matcher: /^[a-z]+(?:[A-Z][a-z]+)*$/,
    splitter: /([A-Z]+[a-z]*)/,
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
      .filter((subSequence) => !StringUtils.isBlank(subSequence));
  }
}
