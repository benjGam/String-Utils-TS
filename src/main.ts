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

  /**
   * Returns a boolean indicating if given string is atleast 2 lengthed string
   *
   * @param {string} str
   * @example
   * str: '      t'
   * returns: false
   * @example
   * str: 'test'
   * returns: true
   * @example
   * str: 'of    '
   * returns: true
   */
  public static isConsiderableCharSequence(str: string): boolean {
    return str.trim().replaceAll(' ', '').length >= 2;
  }
}
