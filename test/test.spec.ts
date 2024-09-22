import { StringUtils } from '../src';
import { IWordEnding } from '../src/word-ending-utils';

// Casing

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

// Plural and Singular features

describe('Plural and Singular operations', () => {
  const isPluralReturns = new Map<string, boolean>([
    ['Pass', false],
    ['Passes', true],
    ['Category', false],
    ['Categories', true],
    ['Bees', true],
    ['Bee', false],
    ['Cars', true],
    ['Bet', false],
  ]);

  for (const key of isPluralReturns.keys()) {
    test(`Should return '${isPluralReturns.get(key)!}' for word = '${key}'`, () => {
      expect(StringUtils.isPlural(key)).toBe(isPluralReturns.get(key)!);
    });
  }

  const isSingularReturns = new Map<string, boolean>(
    Array.from(isPluralReturns.keys()).map((key) => [
      key,
      !isPluralReturns.get(key),
    ]),
  );

  for (const key of isSingularReturns.keys()) {
    test(`Should return '${isSingularReturns.get(key)!}' for word = '${key}'`, () => {
      expect(StringUtils.isSingular(key)).toBe(isSingularReturns.get(key)!);
    });
  }

  const pluralizeWords = new Map<string, string>([
    ['Pass', 'Passes'],
    ['Category', 'Categories'],
    ['Car', 'Cars'],
    ['Bee', 'Bees'],
    ['', ''],
    ['List', 'Lists'],
    ['Lists', 'Lists'],
    ['C', 'C'],
  ]);

  for (const key of pluralizeWords.keys()) {
    test(`Should return '${pluralizeWords.get(key)!}' for word = '${key}'`, () => {
      expect(StringUtils.pluralize(key)).toBe(pluralizeWords.get(key)!);
    });
  }

  const singularizeWords = new Map<string, string>([
    ['Passes', 'Pass'],
    ['Categories', 'Category'],
    ['Cars', 'Car'],
    ['Bees', 'Bee'],
    ['', ''],
    ['Lists', 'List'],
    ['List', 'List'],
    ['C', 'C'],
  ]);

  for (const key of singularizeWords.keys()) {
    test(`Should return '${singularizeWords.get(key)!}' for word = '${key}'`, () => {
      expect(StringUtils.singularize(key)).toBe(singularizeWords.get(key)!);
    });
  }
});

// Non related features

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
    ['Bet', ''],
  ]);

  for (const key of getWordEndingReturns.keys()) {
    test(`Should return '${getWordEndingReturns.get(key)!}' for word = '${key}'`, () => {
      expect(StringUtils.getWordEnding(key)).toEqual(
        getWordEndingReturns.get(key)!,
      );
    });
  }

  const getCorrespondingEndingReturns = new Map<string, IWordEnding>([
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
  ]);

  for (const key of getCorrespondingEndingReturns.keys()) {
    test(`Should return correct IWordEnding object for word = '${key}'`, () => {
      expect(StringUtils.getCorrespondingEnding(key)).toEqual(
        getCorrespondingEndingReturns.get(key)!,
      );
    });
  }
});
