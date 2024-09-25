import Case from './Case';

export default class UpperCase extends Case {
  protected _matcher = /^[A-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/;
  protected _splitter = '';

  public basicConversionReturnFn(
    splittedByCase: string[],
    str: string,
  ): string {
    return str.toUpperCase();
  }

  public blendedConversionReturnFn(
    splittedByCase: string[],
    blended: string[],
    str: string,
  ): string {
    return str.toUpperCase();
  }
}
