export class WordEnding {
  private _pluralForm: string;
  private _singularForm: string;

  constructor(pluralForm: string, singularForm: string) {
    this._pluralForm = pluralForm;
    this._singularForm = singularForm;
  }

  /**
   * Returns the plural of stored singular form
   */
  public get pluralOf(): string {
    return this._pluralForm;
  }

  /**
   * Returns the singular of stored plural form
   */
  public get singularOf(): string {
    return this._singularForm;
  }
}
