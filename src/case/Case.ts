export default abstract class Case {
  protected abstract _matcher: RegExp;
  protected abstract _splitter: RegExp | string;

  /**
   * This method is a wrapper for conversion to targeted case (when `str` is already cased in managed one)
   */
  public abstract basicConversionReturnFn(
    splittedByCase: string[],
    str: string,
  ): string;

  /**
   * This method is a wrapper for conversion to targeted case (when `str` contains spaces)
   */
  public abstract blendedConversionReturnFn(
    splittedByCase: string[],
    blended: string[],
    str: string,
  ): string;

  /**
   * Returns the name of class
   */
  public get name(): string {
    return this.constructor.name;
  }

  /**
   * Returns the matcher for Regex linked to targeted case class
   */
  public get matcher(): RegExp {
    return this._matcher;
  }

  /**
   * Returns the splitter for Regex or string linked to targeted case class
   */
  public get splitter(): RegExp | string {
    return this._splitter;
  }
}
