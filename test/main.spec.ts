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

const replaceAtExpectedReturns = new Map<any[], string>([
  [['This', 2, 'hello'], 'Thhellos'],
  [['Hello', 18, 'hi'], 'Hello'],
  [['Hi', -2, 'hello'], 'Hi'],
]);

for (const key of replaceAtExpectedReturns.keys()) {
  test(`Should return ${replaceAtExpectedReturns.get(key)!} for '${key}'`, () => {
    expect(StringUtils.replaceAt(key[0], key[1], key[2])).toBe(
      replaceAtExpectedReturns.get(key)!,
    );
  });
}

const isConsiderableCharSequenceExpectedReturns = new Map<string, boolean>([
  ['       t', false],
  ['of', true],
  ['    of', true],
  ['of      ', true],
  ['f     ', false],
]);
for (const [
  input,
  output,
] of isConsiderableCharSequenceExpectedReturns.entries()) {
  test(`Should return '${output}' for '${input}'`, () => {
    expect(StringUtils.isConsiderableCharSequence(input)).toBe(output);
  });
}

const removeBlankCharsExpectedReturns = new Map<string, string>([
  ['This is a test', 'Thisisatest'],
  ['Thisisatest', 'Thisisatest'],
  ['    ', ''],
  ['', ''],
]);
for (const [input, output] of removeBlankCharsExpectedReturns.entries()) {
  test(`Should return '${output}' for '${input}'`, () => {
    expect(StringUtils.removeBlankChars(input)).toBe(output);
  });
}

const blendIrrelevantStringsInRelevantOnes = new Map<string, string[]>([
  ['This    is my   ex a m p l   e', ['This', 'is', 'my', 'example']],
  ['T h i s i s m y e x a m p l e', ['Thisismyexample']],
  ['This is    my ex  a  m pl e   ', ['This', 'is', 'my', 'exam', 'ple']],
]);

for (const [input, output] of blendIrrelevantStringsInRelevantOnes.entries()) {
  test(`Should return '${output}' for '${input}'`, () => {
    expect(StringUtils.blendIrrelevantStringsInRelevantOnes(input)).toEqual(
      output,
    );
  });
}

const containsConsiderableCharSequence = new Map<string[], boolean>([
  [['This', 'is', 'my', 'test'], true],
  [[' ', '    t ', '    h '], false],
  [['t', 'h', 'i'], false],
  [['    ', '  '], false],
]);

for (const [input, output] of containsConsiderableCharSequence.entries()) {
  test(`Should return '${output}' for '${input}'`, () => {
    expect(StringUtils.containsConsiderableCharSequence(input)).toBe(output);
  });
}
