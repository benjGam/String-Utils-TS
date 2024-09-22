import { StringUtils } from '../src/main';

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

describe('isUpper & isLower tests', () => {
  const isUpperReturns = new Map<string, boolean>([
    ['H', true],
    ['h', false],
    [' ', false],
    ['THISISATEST', true],
    ['THISisAtest', false],
  ]);

  for (const key of isUpperReturns.keys()) {
    test(`Should return '${isUpperReturns.get(key)!}' for str = '${key}'`, () =>
      expect(StringUtils.isUpper(key)).toBe(isUpperReturns.get(key)!));
  }

  const isLowerReturns = new Map<string, boolean>([
    ['H', false],
    ['h', true],
    [' ', false],
    ['thisisatest', true],
    ['THISisAtest', false],
  ]);

  for (const key of isLowerReturns.keys()) {
    test(`Should return '${isLowerReturns.get(key)!}' for str = '${key}'`, () =>
      expect(StringUtils.isLower(key)).toBe(isLowerReturns.get(key)!));
  }
});
