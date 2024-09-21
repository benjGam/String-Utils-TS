import { StringUtils } from '../src';

describe('Casing operation', () => {
  const samples = new Map<string, string>([
    ['camelCase', 'thisIsMyTest'],
    ['pascalCase', 'ThisIsMyTest'],
    ['snakeCase', 'this_is_my_test'],
  ]);

  for (const key of samples.keys()) {
    test(`Should return '${key}'`, () => {
      expect(StringUtils.determineCase(samples.get(key)!)?.name).toBe(key);
    });
  }

  const splittedByCase = new Map<string, string[]>([
    ['thisIsMyTest', ['this', 'Is', 'My', 'Test']],
    ['ThisIsMyTest', ['This', 'Is', 'My', 'Test']],
    ['this_is_my_test', ['this', 'is', 'my', 'test']],
  ]);

  for (const key of splittedByCase.keys()) {
    test(`Should return '[${splittedByCase.get(key)!.toString()}]'`, () => {
      expect(StringUtils.splitByCase(key)).toEqual(splittedByCase.get(key)!);
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
