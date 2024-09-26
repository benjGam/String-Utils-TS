import Case from './Case';
import StringUtilsCase from './utils';
import StringUtilsWord from '../word';

export default class SnakeCase extends Case {
  protected _matcher = /(\w+)_(\w+)/;
  protected _splitter = '_';

  public basicConversionReturnFn(
    splittedByCase: string[],
    str: string,
  ): string {
    return splittedByCase.join('_').toLowerCase();
  }

  public blendedConversionReturnFn(
    splittedByCase: string[],
    blended: string[],
    str: string,
  ): string {
    return blended.length <= 2
      ? StringUtilsCase.splitByCase(blended.join('')).join('_').toLowerCase()
      : StringUtilsWord.normalizeSpacesBetweenWords(
          blended.join('_'),
        ).toLowerCase();
  }
}
