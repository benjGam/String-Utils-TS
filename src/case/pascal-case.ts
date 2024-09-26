import Case from './Case';
import StringUtilsWord from '../word/utils';
import { StringUtils } from '../main';

export default class PascalCase extends Case {
  protected _matcher = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
  protected _splitter = /([A-Z]+[a-z]*)/;

  public basicConversionReturnFn(
    splittedByCase: string[],
    str: string,
  ): string {
    return StringUtils.removeBlankChars(
      !StringUtils.containsConsiderableCharSequence(splittedByCase)
        ? StringUtilsWord.formatWord(str)
        : StringUtilsWord.formatWords(splittedByCase),
    );
  }

  public blendedConversionReturnFn(
    splittedByCase: string[],
    blended: string[],
    str: string,
  ): string {
    return StringUtils.removeBlankChars(
      blended.length < 2
        ? StringUtilsWord.formatWord(str)
        : StringUtilsWord.formatWords(blended),
    );
  }
}
