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

  /**
   * Replace a subsequent string at a given position by another string in a given string
   *
   * @param {string} str - The string to replace in
   * @param {number} index - Should be included between 0 & str length
   * @param {string} toReplaceWith - The string to replace at
   *
   * @example
   * str: 'Test'
   * index: '2'
   * toReplaceWith: 'hello'
   * returns: 'Tehellost'
   */
  public static replaceAt(
    str: string,
    index: number,
    toReplaceWith: string,
  ): string {
    if (index < 0 || index >= str.length) return str;

    const strArray = Array.from(str);
    strArray[index] = toReplaceWith;

    return strArray.join('');
  }
}
