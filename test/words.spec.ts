import StringUtilsWord, { IWordEnding } from '../src/word-ending-utils';

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
      expect(StringUtilsWord.isPlural(key)).toBe(isPluralReturns.get(key)!);
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
      expect(StringUtilsWord.isSingular(key)).toBe(isSingularReturns.get(key)!);
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
    ['Of', 'Ofs'],
    ['      ', '      '],
  ]);

  for (const key of pluralizeWords.keys()) {
    test(`Should return '${pluralizeWords.get(key)!}' for word = '${key}'`, () => {
      expect(StringUtilsWord.pluralize(key)).toBe(pluralizeWords.get(key)!);
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
    ['Ofs', 'Of'],
    ['      ', '      '],
  ]);

  for (const key of singularizeWords.keys()) {
    test(`Should return '${singularizeWords.get(key)!}' for word = '${key}'`, () => {
      expect(StringUtilsWord.singularize(key)).toBe(singularizeWords.get(key)!);
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
      expect(StringUtilsWord.getWordEnding(key)).toEqual(
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
      expect(StringUtilsWord.getCorrespondingEnding(key)).toEqual(
        getCorrespondingEndingReturns.get(key)!,
      );
    });
  }
});
