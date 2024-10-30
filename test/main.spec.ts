import { StringUtils } from '../src/main';
import JestRunner from './test.utils';

const runner = new JestRunner(StringUtils);

runner.runBasicTests(
  StringUtils.isBlank,
  new Map<string, boolean>([
    ['hey', false],
    ['  hey  ', false],
    ['     ', true],
    ['', true],
  ]),
);

runner.runBasicTests(
  StringUtils.replaceAt,
  new Map<any, string>([
    [() => ['This', 2, 'hello'], 'Thhellos'],
    [() => ['Hello', 18, 'hi'], 'Hello'],
    [() => ['Hi', -2, 'hello'], 'Hi'],
  ]),
);

runner.runBasicTests(
  StringUtils.isConsiderableCharSequence,
  new Map<string, boolean>([
    ['       t', false],
    ['of', true],
    ['    of', true],
    ['of      ', true],
    ['f     ', false],
  ]),
);

runner.runBasicTests(
  StringUtils.removeBlankChars,
  new Map<string, string>([
    ['This is a test', 'Thisisatest'],
    ['Thisisatest', 'Thisisatest'],
    ['    ', ''],
    ['', ''],
  ]),
);

runner.runBasicTests(
  StringUtils.blendIrrelevantStringsInRelevantOnes,
  new Map<string, string[]>([
    ['This    is my   ex a m p l   e', ['This', 'is', 'my', 'example']],
    ['T h i s i s m y e x a m p l e', ['Thisismyexample']],
    ['This is    my ex  a  m pl e   ', ['This', 'is', 'my', 'exam', 'ple']],
  ]),
);

runner.runBasicTests(
  StringUtils.containsConsiderableCharSequence,
  new Map<string[], boolean>([
    [['This', 'is', 'my', 'test'], true],
    [[' ', '    t ', '    h '], false],
    [['t', 'h', 'i'], false],
    [['    ', '  '], false],
    [['T', 'h', 'is'], true],
  ]),
);

runner.runBasicTests(
  StringUtils.containsOnlyConsiderableCharSequences,
  new Map<string[], boolean>([
    ['this is my example'.split(' '), true],
    ['this i s my example'.split(' '), false],
    ['    '.split(' '), false],
  ]),
);

runner.runBasicTests(
  StringUtils.getFirstCharIndex,
  new Map<string, number>([
    ['   this is a sentence', 3],
    ['this is a sentence', 0],
    ['!!this', 2],
    ['!!!', -1],
  ]),
);
