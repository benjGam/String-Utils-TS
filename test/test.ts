import { Case, StringUtils } from '../src';

describe('Determine case of given string.', () => {
  const samples = new Map<Case, string>([
    [Case.CAMEL_CASE, 'thisIsATest'],
    [Case.PASCAL_CASE, 'ThisIsATest'],
    [Case.SNAKE_CASE, 'this_is_a_test'],
  ]);

  for (const key of samples.keys()) {
    test(`Should return '${key}'`, () => {
      expect(StringUtils.determineCase(samples.get(key))).toBe(key);
    });
  }
});
