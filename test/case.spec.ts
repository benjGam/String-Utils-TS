import StringUtilsCase, { CaseName } from '../src/case';
import JestRunner from './test.utils';

const runner = new JestRunner(StringUtilsCase);

describe('Casing operation', () => {
  runner.runBasicTests(
    StringUtilsCase.determineCase,
    new Map<string, CaseName | undefined>([
      ['thisIsMyTest', 'CamelCase'],
      ['ThisIsMyTest', 'PascalCase'],
      ['this_is_my_test', 'SnakeCase'],
      ['THISISMY23  TEST', 'UpperCase'],
      ['thisis02my  test', 'LowerCase'],
      ['thisisATEST', undefined],
    ]),
    'name',
  );

  runner.runBasicTests(
    StringUtilsCase.splitByCase,
    new Map<string, string[]>([
      ['thisIsMyTest', ['this', 'Is', 'My', 'Test']],
      ['ThisIsMyTest', ['This', 'Is', 'My', 'Test']],
      ['this_is_my_test', ['this', 'is', 'my', 'test']],
      ['This is my test', ['This is my test']],
      ['THIS', ['T', 'H', 'I', 'S']],
      ['this', ['t', 'h', 'i', 's']],
      ['this is a test', 'this is a test'.split('')],
      ['THIS IS A TEST', 'THIS IS A TEST'.split('')],
    ]),
  );

  runner.runBasicTests(
    StringUtilsCase.convertToCase,
    new Map<Function, string>([
      [() => ['thisIsMyTest', 'SnakeCase'], 'this_is_my_test'],
      [() => ['thisIsMyTest', 'CamelCase'], 'thisIsMyTest'],
      [() => ['thisIsMyTest', 'PascalCase'], 'ThisIsMyTest'],
      [() => ['thisIsMyTest', 'LowerCase'], 'thisismytest'],
      [() => ['thisIsMyTest', 'UpperCase'], 'THISISMYTEST'],
      [() => ['a', 'CamelCase'], 'a'],
      [() => ['this', 'CamelCase'], 'tHIS'],
      [() => ['th', 'CamelCase'], 'tH'],
      [() => ['thisISMYTEST', 'CamelCase'], 'thisISMYTEST'],
    ]),
  );

  runner.runBasicTests(
    StringUtilsCase.toCamelCase,
    new Map<string, string>([
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
      ['thisISMYTEST', 'thisISMYTEST'],
    ]),
  );

  runner.runBasicTests(
    StringUtilsCase.toPascalCase,
    new Map<string, string>([
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
      ['thisISMYTEST', 'thisISMYTEST'],
    ]),
  );

  runner.runBasicTests(
    StringUtilsCase.toSnakeCase,
    new Map<string, string>([
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
      ['thisISMYTEST', 'thisISMYTEST'],
      ['this   _ is _ my _ test', 'this_is_my_test'],
    ]),
  );
});
