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
});
