import { knownCases } from './case';

export class StringUtils {
  /**
   * Returns the case with which parameters was written.
   *
   * @param str - The string to test to determine case
   *
   * @returns The case of parameter
   */
  public static determineCase(str: string): string | undefined {
    return knownCases.find((caseObject) => str.match(caseObject.matcher)).name;
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
   * @returns A table of sub strings
   */

  public static splitByCase(str: string): string[] {
    return [str];
  }

  /**
   * Check if a given string is blank or not
   *
   * @param str
   * @returns true if given string only contains spaces or nothing, false otherwise
   */

  public static isBlank(str: string): boolean {
    return str.trim().replaceAll(' ', '').length == 0;
  }
}
