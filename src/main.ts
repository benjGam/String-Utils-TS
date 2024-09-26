import StringUtilsWord from './word/utils';

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

  /**
   * Returns a boolean indicating if a given string table contains atleast one considerable subsequence
   *
   * @param {string[]} stringTable - Should be a table of string
   *
   * @example
   * stringTable: ['This', 'is', 'my', 'test']
   * retunrs: true
   * @example
   * stringTable: [' ', ' ', ' ']
   * retunrs: false
   * @example
   * stringTable: ['t', 'h', 'i']
   * retruns: false
   */
  public static containsConsiderableCharSequence(
    stringTable: string[],
  ): boolean {
    if (this.isBlank(stringTable.join(''))) return false;
    return (
      stringTable.find((subsequence) =>
        this.isConsiderableCharSequence(subsequence),
      ) != undefined
    );
  }

  /**
   * Returns a boolean indicating if a given string table contains only considerable subsequence
   *
   * @param {string[]} stringTable - Should be a table of string
   *
   * @example
   * stringTable: ['This', 'is', 'my', 'example']
   * returns: true
   * @example
   * stringTable: ['This', 'i', 's', 'my', 'example']
   * returns: false
   */
  public static containsOnlyConsiderableCharSequences(
    stringTable: string[],
  ): boolean {
    if (this.isBlank(stringTable.join(''))) return false;
    return (
      stringTable.find(
        (subsequence) => !this.isConsiderableCharSequence(subsequence),
      ) == undefined
    );
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
   * Return a string removed from all blank chars
   *
   * @param {string} str - The string of which remove blank spaces
   *
   * @example
   * str: This is my example
   * returns: Thisismyexample
   */
  public static removeBlankChars(str: string): string {
    return str.replaceAll(' ', '');
  }

  /**
   * Returns a table of string where each element is at least 2 length char
   *
   * @param {string} str - Should be a string containing spaces and at least 2 letters
   *
   * @remarks
   * This method works only if str starts with a relevant / considerable sub string sequence, it should be rework later to manage following relevant sequences
   *
   * @example
   * str: 'This    is my   ex a m p l   e'
   * returns: ['This', 'is', 'my', 'example']
   * @example
   * str: 'T h i s m y e x a m p l e'
   * returns: ['Thisismyexample']
   * @example
   * str: 'Thi   s is my exa mple'
   * returns: ['This is my exa mple']
   *
   */
  public static blendIrrelevantStringsInRelevantOnes(str: string): string[] {
    const splittedStr =
      StringUtilsWord.normalizeSpacesBetweenWords(str).split(' ');

    if (!this.containsConsiderableCharSequence(splittedStr))
      return [this.removeBlankChars(str)];

    if (this.containsOnlyConsiderableCharSequences(splittedStr))
      return splittedStr;

    const revelantSubSequences: string[] = [];

    /* If the current subsequence is relevant, push it to revelants table
     * Otherwise append the current one to the last relevant subsequence
     */

    splittedStr.forEach((subSequence) => {
      if (this.isConsiderableCharSequence(subSequence))
        revelantSubSequences.push(subSequence);
      else
        revelantSubSequences[revelantSubSequences.length - 1] +=
          `${subSequence}`;
    });

    return revelantSubSequences;
  }
}
