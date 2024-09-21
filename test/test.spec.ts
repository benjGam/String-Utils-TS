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
    ['This is my test', ['This is my test']],
  ]);

  for (const key of splittedByCase.keys()) {
    test(`Should return '[${splittedByCase.get(key)!.toString()}]'`, () => {
      expect(StringUtils.splitByCase(key)).toEqual(splittedByCase.get(key)!);
    });
  }
});

describe('Non related features', () => {
  const isBlankExpectedReturns = new Map<string, boolean>([
    ['hey', false],
    ['  hey  ', false],
    ['     ', true],
    ['', true],
  ]);

  for (const strKey of isBlankExpectedReturns.keys()) {
    test(`Should return '${isBlankExpectedReturns.get(strKey)!}' for str = '${strKey}'`, () => {
      expect(StringUtils.isBlank(strKey)).toBe(
        isBlankExpectedReturns.get(strKey)!,
      );
    });
  }

  const getWordEndingReturns = new Map<string, string>([
    ['Pass', 'ss'],
    ['Passes', 'sses'],
    ['Category', 'y'],
    ['Categories', 'ies'],
    ['Bees', 'es'],
    ['Bee', 'e'],
    ['Cars', 's'],
  ]);

  for (const key of getWordEndingReturns.keys()) {
    test(`Should return '${getWordEndingReturns.get(key)!}' for word = '${key}'`, () => {
      expect(StringUtils.getWordEnding(key)).toEqual(
        getWordEndingReturns.get(key)!,
      );
    });
  }
});
