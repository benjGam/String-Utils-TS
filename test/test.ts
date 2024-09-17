import { StringFormatter } from "../src";

test('Should return `This is a test`', () => {
  expect(StringFormatter.normalizeSpaces("This   is    a  test")).toBe("This is a test");
});