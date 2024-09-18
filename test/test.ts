import { Casing, StringFormatter } from "../src";

test('Should return `This is a test`', () => {
  expect(StringFormatter.normalizeSpaces("This   is    a  test")).toBe("This is a test");
});

describe("Casing functions test", () => {

  test('Should be equal to "camelCase"', () => {
    expect(StringFormatter.resolveCase("myTestIsBetter")).toBe("camelCase");
  });

  test('Should be equal to "PascalCase"', () => {
    expect(StringFormatter.resolveCase("MyTestIsBetter")).toBe("pascalCase");
  });

  test('Should be equal to "snake_case"', () => {
    expect(StringFormatter.resolveCase("my_test_is_better")).toBe("snakeCase");
  });

  test('Should be equal to "[Hey, You, Are, My, Friend]', () => {
    expect(StringFormatter.splitByCasing("HeyYouAreMyFriend")).toEqual(["Hey", "You", "Are", "My", "Friend"]);
  });

  test('Should be equal to "helloYouAreYouMyFriend"', () => {
    expect(StringFormatter.convertToCasing("helloYouAreYouMyFriend", Casing.snake_case));
  });

});