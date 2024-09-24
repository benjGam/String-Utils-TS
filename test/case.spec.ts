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
    ['this is a test', 'this is a test'.split('')],
    ['THIS IS A TEST', 'THIS IS A TEST'.split('')],
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

  const toCamelCaseExpectedReturns = new Map<string, string>([
    ['thisIsMyTest', 'thisIsMyTest'],
    ['ThisIsMyTest', 'thisIsMyTest'],
    ['', ''],
    ['th', 'tH'],
    ['    th', 'tH'],
    ['thisIsM      y Tes t', 'thisIsMyTest'],
    ['this_is_my_test', 'thisIsMyTest'],
    ['this is my test', 'thisIsMyTest'],
    ['ThisIsMyTest', 'thisIsMyTest'],
    ['This Is My Test', 'thisIsMyTest'],
  ]);
  for (const [input, output] of toCamelCaseExpectedReturns.entries()) {
    test(`Should return '${output}' for '${input}'`, () => {
      expect(StringUtilsCase.toCamelCase(input)).toBe(output);
    });
  }

  const toPascalCaseExpectedReturns = new Map<string, string>([
    ['thisIsMyTest', 'ThisIsMyTest'],
    ['ThisIsMyTest', 'ThisIsMyTest'],
    ['', ''],
    ['th', 'Th'],
    ['    th', 'Th'],
    ['thisIsM      y Tes t', 'ThisIsMyTest'],
    ['this_is_my_test', 'ThisIsMyTest'],
    ['this is my test', 'ThisIsMyTest'],
    ['ThisIsMyTest', 'ThisIsMyTest'],
    ['This Is My Test', 'ThisIsMyTest'],
  ]);
  for (const [input, output] of toPascalCaseExpectedReturns.entries()) {
    test(`Should return '${output}' for '${input}'`, () => {
      expect(StringUtilsCase.toPascalCase(input)).toBe(output);
    });
  }

  const toSnakeCaseExpectedReturns = new Map<string, string>([
    ['thisIsMyTest', 'this_is_my_test'],
    ['ThisIsMyTest', 'this_is_my_test'],
    ['', ''],
    ['th', 't_h'],
    ['    th', 't_h'],
    ['thisIsM      y Tes t', 'this_is_my_test'],
    ['this_is_my_test', 'this_is_my_test'],
    ['this is my test', 'this_is_my_test'],
    ['ThisIsMyTest', 'this_is_my_test'],
    ['This Is My Test', 'this_is_my_test'],
  ]);
  for (const [input, output] of toSnakeCaseExpectedReturns.entries()) {
    test(`Should return '${output}' for '${input}'`, () => {
      expect(StringUtilsCase.toSnakeCase(input)).toBe(output);
    });
  }
});
