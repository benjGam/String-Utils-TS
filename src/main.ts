export class StringUtils {
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
   * Check if a given string is upper case
   *
   * @param {string} str - Should be non blank string
   *
   * @returns {boolean}
   */
  public static isUpper(str: string): boolean {
    return !this.isBlank(str) && str.toUpperCase() == str;
  }

  /**
   * Check if a given string is lower case
   *
   * @param {string} str - Should be non blank string
   *
   * @returns {boolean}
   */
  public static isLower(str: string): boolean {
    return !this.isBlank(str) && str.toLowerCase() == str;
  }
}
