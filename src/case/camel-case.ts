import Case from './Case';
import StringUtilsCase from '../case';
import StringUtilsWord from '../word';
import { StringUtils } from '../main';

export default class CamelCase extends Case {
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
