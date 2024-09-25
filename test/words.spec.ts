import StringUtilsWord, { IWordEnding } from '../src/word';
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
    new Map<string, IWordEnding>([
      [
        'Passes',
        {
          pluralForm: 'sses',
          singularForm: 'ss',
        },
      ],
      [
        'Pass',
        {
          pluralForm: 'sses',
          singularForm: 'ss',
        },
      ],
      [
        'Categories',
        {
          pluralForm: 'ies',
          singularForm: 'y',
        },
      ],
      [
        'Category',
        {
          pluralForm: 'ies',
          singularForm: 'y',
        },
      ],
      [
        'Bees',
        {
          pluralForm: 'es',
          singularForm: 'e',
        },
      ],
      [
        'Bee',
        {
          pluralForm: 'es',
          singularForm: 'e',
        },
      ],
      [
        'Cars',
        {
          pluralForm: 's',
          singularForm: '',
        },
      ],
      [
        'Car',
        {
          pluralForm: 's',
          singularForm: '',
        },
      ],
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
});
