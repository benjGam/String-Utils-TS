import { StringUtils } from '../src';

describe('Determine case of given string.', () => {
  const samples = new Map<string, string>([
    ['camelCase', 'thisIsMyTest'],
    ['pascalCase', 'ThisIsMyTest'],
    ['snakeCase', 'this_is_my_test'],
  ]);

  for (const key of samples.keys()) {
    test(`Should return '${key}'`, () => {
      expect(StringUtils.determineCase(samples.get(key))).toBe(key);
    });
  }
});
