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
}
