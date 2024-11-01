import { StringUtils } from '../main';
import { WordEnding } from './word-ending';

/**
 * This object is used to list plural and singular forms
 * of words.
 */
const wordEndings: WordEnding[] = [
  new WordEnding('sses', 'ss'),
  new WordEnding('ies', 'y'),
  new WordEnding('es', 'e'),
  new WordEnding('s', ''),
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
  public static getCorrespondingEnding(word: string): WordEnding {
    return wordEndings.find(
      (ending) =>
        word.endsWith(ending.pluralForm) || word.endsWith(ending.singularForm),
    );
  }

  /**
   * Returns the plural form of a singular one.
   *
   * @param {string} str - Should be a singular form
   *
   * @example
   * str: 'y'
   * returns: 'ies'
   *
   * @example
   * str: 'ss'
   * returns: 'sses'
   */
  public static getPluralOf(str: string): string {
    return this.getCorrespondingEnding(str).pluralForm;
  }

  /**
   * Returns the singular form of a plural one.
   *
   * @param {string} str - Should be a plural form
   *
   * @example
   * str: 'ies'
   * returns: 'y'
   *
   * @example
   * str: 'sses'
   * returns: 'ss'
   */
  public static getSingularOf(str: string): string {
    return this.getCorrespondingEnding(str).singularForm;
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
    if (!StringUtils.isConsiderableCharSequence(word) || this.isPlural(word))
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
    if (!StringUtils.isConsiderableCharSequence(word) || this.isSingular(word))
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

  /**
   * Return a string with each words formated.
   *
   * @param {string | string[]} toFormat - The string or table of strings to format
   *
   * @example
   * toFormat: 'Hello this is my example'
   * returns: 'Hello This Is My Example'
   *
   * @example
   * toFormat: ['Hello', 'this', 'is', 'my', 'example']
   * returns: 'Hello This Is My Example'
   */
  public static formatWords(toFormat: string | string[]): string {
    if (!Array.isArray(toFormat)) {
      if (StringUtils.isBlank(toFormat)) return toFormat;
      toFormat = toFormat.split(' ');
    }
    if (StringUtils.isBlank(toFormat.join(''))) return toFormat.join('');

    return toFormat
      .map((subSequence) => this.formatWord(subSequence))
      .join(' ');
  }

  /**
   *
   * Returns a dot at end of sentence & first word char uppered.
   *
   * @param sentence - A sentence in a string
   *
   * @example
   * sentence: '        this is a     sentence'
   * returns: 'This is a sentence.'
   */
  public static normalizeSentence(sentence: string): string {
    const firstCharIndex = StringUtils.getFirstCharIndex(sentence);
    if (firstCharIndex == -1)
      // There's no char in given string
      return sentence;
    sentence = this.normalizeSpacesBetweenWords(
      sentence.substring(firstCharIndex, sentence.length),
    );
    const arrayOfSentence = sentence.split('');
    sentence = sentence.toLowerCase();
    arrayOfSentence[0] = arrayOfSentence[0].toUpperCase();
    return `${arrayOfSentence.join('')}${StringUtils.getFirstEndingPunctuationIndex(sentence) == sentence.length - 1 ? '' : '.'}`;
  }
}
