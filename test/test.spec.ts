import { StringUtils } from '../src';

describe('Determine case of given string.', () => {
  const samples = new Map<string, string>([
    ['camelCase', 'thisIsMyTest'],
    ['pascalCase', 'ThisIsMyTest'],
    ['snakeCase', 'this_is_my_test'],
  ]);

  for (const key of samples.keys()) {
    test(`Should return '${key}'`, () => {
      expect(StringUtils.determineCase(samples.get(key)!)).toBe(key);
    });
  }
});

describe('Extensions testing', () => {
  test('Should return "true" for "" string', () => {
    expect(StringUtils.isBlank('')).toBe(true);
  });

  test('Should return "false" for "hey" string', () => {
    expect(StringUtils.isBlank('hey')).toBe(false);
  });

  test('Should return "false" for "  hey  " string', () => {
    expect(StringUtils.isBlank('  hey  ')).toBe(false);
  });

  test('Should return "true" for "   " string', () => {
    expect(StringUtils.isBlank('   ')).toBe(true);
  });
});
