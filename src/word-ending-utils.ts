import { StringUtils } from './main';

/**
 * This interface provide a structure to register word endings forms
 *
 * @interface IWordEnding
 * @field {string} pluralForm is used to store a plural form of ending
 * @field {string} singularForm is used to store the singular form of the plural form ending
 *
 * @example
 * pluralForm: 'ies'
 * singularForm: 'y'
 */
export interface IWordEnding {
  pluralForm: string;
  singularForm: string;
}

/**
 * This object is used to list plural and singular forms
 * of words.
 */
const wordEndings: IWordEnding[] = [
  {
    pluralForm: 'sses',
    singularForm: 'ss',
  },
  {
    pluralForm: 'ies',
    singularForm: 'y',
  },
  {
    pluralForm: 'es',
    singularForm: 'e',
  },
  {
    pluralForm: 's',
    singularForm: '',
  },
];

/**
 * This object is used to concat endings to avoid logic overload
 *
 * Used in:
 * @method StringUtils.getWordEnding()
 */
export const unorderedWordEndings: string[] = wordEndings.flatMap((ending) => [
  ending.pluralForm,
  ending.singularForm,
]);

export default class StringUtilsWord {
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
   *
   * @remarks
   * This method should not be used for any external operations.
   * It's a non optimized way to get a IWordEnding and
   * should be rework to be lightest.
   *
   * If you just want to do some word operation, prefer
   * @method getWordEnding
   */
  public static getCorrespondingEnding(word: string): IWordEnding {
    return wordEndings.find(
      (ending) =>
        word.endsWith(ending.pluralForm) || word.endsWith(ending.singularForm),
    );
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
    if (word.trim().replaceAll(' ', '').length < 2 || this.isPlural(word))
      return word;

    const wordEnding = this.getCorrespondingEnding(word);

    return word.replace(
      new RegExp(`(${wordEnding.singularForm})$`),
      wordEnding.pluralForm,
    );
  }

  /**
   * Return singularized version of the given word
   *
   * @param {string} word - Should be a word
   * @example
   * word: Passes
   * returns: Pass
   */
  public static singularize(word: string): string {
    if (word.trim().replaceAll(' ', '').length < 2 || this.isSingular(word))
      return word;

    const wordEnding = this.getCorrespondingEnding(word);

    return word.replace(
      new RegExp(`(${wordEnding.pluralForm})$`),
      wordEnding.singularForm,
    );
  }

  /**
   * Return a first char uppered word
   *
   * @param {string} word - Should be a word
   * @example
   * word: test
   * returns: Test
   */
  public static formatWord(word: string): string {
    if (StringUtils.isBlank(word)) return word;

    const firstCharIndex = Array.from(word).findIndex((char) => char != ' ');

    return StringUtils.replaceAt(
      word,
      firstCharIndex,
      word[firstCharIndex].toUpperCase(),
    );
  }

  /**
   * Return a normalized spaces string
   *
   * @param {string} str - The string to clean from excessive spaces
   * @example
   * str: This     is a    test.
   * returns: This is a test.
   */
  public static normalizeSpacesBetweenWords(str: string): string {
    return str
      .split(' ')
      .filter((subsequence) => !StringUtils.isBlank(subsequence))
      .join(' ');
  }
}
