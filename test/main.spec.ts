import { StringUtils } from '../src/main';
import JestRunner from './test.utils';

const runner = new JestRunner(StringUtils);

runner.runBasicTests(
  new Map<string, boolean>([
    ['hey', false],
    ['  hey  ', false],
    ['     ', true],
    ['', true],
  ]),
  StringUtils.isBlank,
);

runner.runBasicTests(
  new Map<any, string>([
    [() => ['This', 2, 'hello'], 'Thhellos'],
    [() => ['Hello', 18, 'hi'], 'Hello'],
    [() => ['Hi', -2, 'hello'], 'Hi'],
  ]),
  StringUtils.replaceAt,
);

runner.runBasicTests(
  new Map<string, boolean>([
    ['       t', false],
    ['of', true],
    ['    of', true],
    ['of      ', true],
    ['f     ', false],
  ]),
  StringUtils.isConsiderableCharSequence,
);

runner.runBasicTests(
  new Map<string, string>([
    ['This is a test', 'Thisisatest'],
    ['Thisisatest', 'Thisisatest'],
    ['    ', ''],
    ['', ''],
  ]),
  StringUtils.removeBlankChars,
);

runner.runBasicTests(
  new Map<string, string[]>([
    ['This    is my   ex a m p l   e', ['This', 'is', 'my', 'example']],
    ['T h i s i s m y e x a m p l e', ['Thisismyexample']],
    ['This is    my ex  a  m pl e   ', ['This', 'is', 'my', 'exam', 'ple']],
  ]),
  StringUtils.blendIrrelevantStringsInRelevantOnes,
);

runner.runBasicTests(
  new Map<string[], boolean>([
    [['This', 'is', 'my', 'test'], true],
    [[' ', '    t ', '    h '], false],
    [['t', 'h', 'i'], false],
    [['    ', '  '], false],
    [['T', 'h', 'is'], true],
  ]),
  StringUtils.containsConsiderableCharSequence,
);

runner.runBasicTests(
  new Map<string[], boolean>([
    ['this is my example'.split(' '), true],
    ['this i s my example'.split(' '), false],
    ['    '.split(' '), false],
  ]),
  StringUtils.containsOnlyConsiderableCharSequences,
);
