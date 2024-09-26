import StringUtilsWord from '../src/word/utils';
import { WordEnding } from '../src/word/word-ending';
import JestRunner from './test.utils';

const runner = new JestRunner(StringUtilsWord);

describe('Get word ending', () => {
  runner.runBasicTests(
    StringUtilsWord.getWordEnding,
    new Map<string, string>([
      ['Pass', 'ss'],
      ['Passes', 'sses'],
      ['Category', 'y'],
      ['Categories', 'ies'],
      ['Bees', 'es'],
      ['Bee', 'e'],
      ['Cars', 's'],
      ['Bet', ''],
    ]),
  );

  runner.runBasicTests(
    StringUtilsWord.getCorrespondingEnding,
    new Map<string, WordEnding>([
      ['Passes', new WordEnding('sses', 'ss')],
      ['Pass', new WordEnding('sses', 'ss')],
      ['Categories', new WordEnding('ies', 'y')],
      ['Category', new WordEnding('ies', 'y')],
      ['Bees', new WordEnding('es', 'e')],
      ['Bee', new WordEnding('es', 'e')],
      ['Cars', new WordEnding('s', '')],
      ['Car', new WordEnding('s', '')],
    ]),
  );
});

describe('Is singular or plural', () => {
  const isPluralExpectedReturns = new Map<string, boolean>([
    ['Pass', false],
    ['Passes', true],
    ['Category', false],
    ['Categories', true],
    ['Bees', true],
    ['Bee', false],
    ['Cars', true],
    ['Bet', false],
  ]);

  const isSingularExpectedReturns = new Map<string, boolean>(
    Array.from(isPluralExpectedReturns.keys()).map((key) => [
      key,
      !isPluralExpectedReturns.get(key),
    ]),
  );

  runner.runBasicTests(StringUtilsWord.isPlural, isPluralExpectedReturns);
  runner.runBasicTests(StringUtilsWord.isSingular, isSingularExpectedReturns);
});

describe('Move from singular to plural and vice-versa', () => {
  runner.runBasicTests(
    StringUtilsWord.pluralize,
    new Map<string, string>([
      ['Pass', 'Passes'],
      ['Category', 'Categories'],
      ['Car', 'Cars'],
      ['Bee', 'Bees'],
      ['', ''],
      ['List', 'Lists'],
      ['Lists', 'Lists'],
      ['C', 'C'],
      ['Of', 'Ofs'],
      ['      ', '      '],
    ]),
  );

  runner.runBasicTests(
    StringUtilsWord.singularize,
    new Map<string, string>([
      ['Passes', 'Pass'],
      ['Categories', 'Category'],
      ['Cars', 'Car'],
      ['Bees', 'Bee'],
      ['', ''],
      ['Lists', 'List'],
      ['List', 'List'],
      ['C', 'C'],
      ['Ofs', 'Of'],
      ['      ', '      '],
    ]),
  );
});

describe('Normalization of stuffs', () => {
  runner.runBasicTests(
    StringUtilsWord.formatWord,
    new Map<string, string>([
      ['this', 'This'],
      ['    this', '    This'],
      ['', ''],
      ['    ', '    '],
      ['This', 'This'],
      ['this Is a test', 'This Is a test'],
    ]),
  );

  runner.runBasicTests(
    StringUtilsWord.normalizeSpacesBetweenWords,
    new Map<string, string>([
      ['This      is a     test', 'This is a test'],
      ['Hello             ', 'Hello'],
      ['      Hello', 'Hello'],
    ]),
  );

  runner.runBasicTests(
    StringUtilsWord.formatWords,
    new Map<string | string[], string>([
      ['This is my test', 'This Is My Test'],
      [['This', 'is', 'my', 'test'], 'This Is My Test'],
      [['        ', ''], '        '],
      ['      ', '      '],
      [['This ', 'is ', 'my ', 'test'], 'This  Is  My  Test'],
    ]),
  );

  runner.runBasicTests(
    StringUtilsWord.getPluralOf,
    new Map<string, string>([
      ['y', 'ies'],
      ['ss', 'sses'],
      ['es', 'e'],
      ['', 's'],
    ]),
  );
});
