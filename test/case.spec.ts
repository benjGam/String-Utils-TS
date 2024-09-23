import StringUtilsCase, { Case } from '../src/case';

describe('Casing operation', () => {
  const samples = new Map<string | undefined, string>([
    ['camelCase', 'thisIsMyTest'],
    ['pascalCase', 'ThisIsMyTest'],
    ['snakeCase', 'this_is_my_test'],
    ['upperCase', 'THISISMY23  TEST'],
    ['lowerCase', 'thisis02my  test'],
    [undefined, 'thisisATEST'],
  ]);

  for (const key of samples.keys()) {
    test(`Should return '${key}'`, () => {
      expect(StringUtilsCase.determineCase(samples.get(key)!)?.name).toBe(key);
    });
  }

  const splittedByCase = new Map<string, string[]>([
    ['thisIsMyTest', ['this', 'Is', 'My', 'Test']],
    ['ThisIsMyTest', ['This', 'Is', 'My', 'Test']],
    ['this_is_my_test', ['this', 'is', 'my', 'test']],
    ['This is my test', ['This is my test']],
    ['THIS', ['T', 'H', 'I', 'S']],
    ['this', ['t', 'h', 'i', 's']],
  ]);

  for (const key of splittedByCase.keys()) {
    test(`Should return '[${splittedByCase.get(key)!.toString()}]'`, () => {
      expect(StringUtilsCase.splitByCase(key)).toEqual(
        splittedByCase.get(key)!,
      );
    });
  }

  const convertToCaseExpectedReturns = new Map<[string, Case], string>([
    [['thisIsMyTest', 'snakeCase'], 'this_is_my_test'],
    [['thisIsMyTest', 'camelCase'], 'thisIsMyTest'],
    [['thisIsMyTest', 'pascalCase'], 'ThisIsMyTest'],
    [['thisIsMyTest', 'lowerCase'], 'thisismytest'],
    [['thisIsMyTest', 'upperCase'], 'THISISMYTEST'],
    [['a', 'camelCase'], 'a'],
    [['this', 'camelCase'], 'tHIS'],
    [['th', 'camelCase'], 'tH'],
    [['thisISMYTEST', 'camelCase'], 'thisISMYTEST'],
  ]);

  for (const [key, value] of convertToCaseExpectedReturns.entries()) {
    test(`Should return '${value}' for '${key}'`, () => {
      expect(StringUtilsCase.convertToCase(...key)).toBe(value);
    });
  }
});
