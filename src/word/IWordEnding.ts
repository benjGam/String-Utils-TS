/**
 * This interface provide a structure to register word endings forms
 *
 * @interface IWordEnding
 * @field {string} pluralForm is used to store a plural form of ending
 * @field {string} singularForm is used to store the singular form of the plural form ending
 *
 * @example
 * pluralForm: 'ies'
 * singularForm: 'y'
 */
export interface IWordEnding {
  pluralForm: string;
  singularForm: string;
}
