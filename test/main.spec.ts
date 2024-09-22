import { StringUtils } from '../src/main';

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
});
