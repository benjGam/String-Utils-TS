export default abstract class Case {
  private _name: string;
  private _matcher: RegExp;
  private _splitter: RegExp | string;

  public abstract basicConversionReturnFn(): string;
  public abstract blendedConversionReturnFn(): string;

  public get name(): string {
    return this._name;
  }

  public get matcher(): RegExp {
    return this._matcher;
  }

  public get splitter(): RegExp | string {
    return this._splitter;
  }
}
