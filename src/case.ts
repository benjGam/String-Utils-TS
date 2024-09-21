/**
 * This interface provide a structure for literal objects
 * It brings reliable way to add unmanaged cases without any other code writing
 *
 * @interface ICase
 * @field {string} name is used to represent a matcher & splitter for case
 * @field {RegExp} matcher is used with Regex operations to check if a given string match
 * @field {RegExp | string} splitter is used to split given string who match `matcher`
 *
 */
export interface ICase {
  name: string;
  matcher: RegExp;
  splitter: RegExp | string;
}

/**
 * This table store few basics cases.
 *
 * @method StringUtils.determineCase <- Use it
 */
export const knownCases: ICase[] = [
  {
    name: 'snakeCase',
    matcher: /(\w+)_(\w+)/,
    splitter: '_',
  },
  {
    name: 'pascalCase',
    matcher: /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/,
    splitter: /([A-Z]+[a-z]*)/,
  },
  {
    name: 'camelCase',
    matcher: /^[a-z]+(?:[A-Z][a-z]+)*$/,
    splitter: /([A-Z]+[a-z]*)/,
  },
];
