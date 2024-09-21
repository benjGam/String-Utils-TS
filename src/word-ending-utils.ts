/**
 * This interface provide a structure to register word endings forms
 *
 * @interface IWordEnding
 * @field {string} pluralForm is used to store a plural form of ending
 * @field {string} singularForm is used to store the singular form of the plural form ending
 *
 * @example
 * ```
 * pluralForm: 'ies'
 * singularForm: 'y'
 * ```
 */
export interface IWordEnding {
  pluralForm: string;
  singularForm: string;
}

/**
 * This object is used to list plural and singular forms
 * of words.
 */
export const wordEndings: IWordEnding[] = [
  {
    pluralForm: 'sses',
    singularForm: 'ss',
  },
  {
    pluralForm: 'ies',
    singularForm: 'y',
  },
  {
    pluralForm: 'es',
    singularForm: 'e',
  },
  {
    pluralForm: 's',
    singularForm: '',
  },
];

/**
 * This object is used to concat endings to avoid logic overload
 */
export const unorderedWordEndings = wordEndings
  .map((ending) => {
    ending.pluralForm, ending.singularForm;
  })
  .flat();
