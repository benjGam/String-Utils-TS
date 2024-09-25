import Case from './Case';

export default class LowerCase extends Case {
  protected _matcher = /^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/;
  protected _splitter = '';

  public basicConversionReturnFn(
    splittedByCase: string[],
    str: string,
  ): string {
    return str.toLowerCase();
  }

  public blendedConversionReturnFn(
    splittedByCase: string[],
    blended: string[],
    str: string,
  ): string {
    return str.toLowerCase();
  }
}
