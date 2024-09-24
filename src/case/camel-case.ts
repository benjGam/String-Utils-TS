import Case from './Case';
import StringUtilsCase from '../case';
import StringUtilsWord from '../word';
import { StringUtils } from '../main';

export default class CamelCase extends Case {
  protected _matcher = /^[a-z]+(?:[A-Z][a-z]+)*$/;
  protected _splitter = /([A-Z]+[a-z]*)/;

  /*
   * `str` do not need blending operation (there's no spaces into it)
   * from `splittedByCase`, for each subsequence
   * (at this step, it should be atleast a subSequence of length >= 2: because of check if it's a considerable str)
   * if current subSequence index is index 0, then lower it
   * otherwise format the current subSequence as a word (c.f: with first char uppered and the rest lowered)
   */
  public basicConversionReturnFn(
    splittedByCase: string[],
    str: string,
  ): string {
    return splittedByCase
      .map((subSequence, index) =>
        index == 0
          ? subSequence.toLowerCase()
          : StringUtilsWord.formatWord(subSequence),
      )
      .join('');
  }

  /*
   * `str` was blent (see StringUtils.blendIrrelevantStringsInRelevantOnes) and stored in `blended`
   * if blended length < 2 (c.f: blend operation didn't produce more than 1 relevant string) then
   * the table to work with in previous statement will be the result of splitted removed from blank chars
   * version of `str` (which is never modified).
   * Otherwise use the result of blend operation as table to work with (blended)
   */
  public blendedConversionReturnFn(
    splittedByCase: string[],
    blended: string[],
    str: string,
  ): string {
    return (
      blended.length < 2
        ? StringUtilsCase.splitByCase(StringUtils.removeBlankChars(str))
        : blended
    )
      .map((subSequence, index) =>
        index == 0
          ? subSequence.toLowerCase()
          : StringUtilsWord.formatWord(subSequence),
      )
      .join('');
  }
}
