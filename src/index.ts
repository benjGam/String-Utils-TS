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
   * Check if a given string is blank or not
   *
   * @param str
   * @returns true if given string only contains spaces or nothing, false otherwise
   */

  public static isBlank(str: string): boolean {
    return str.trim().replaceAll(' ', '').length == 0;
  }
}
