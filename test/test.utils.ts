export default class JestUtils {
  public static runBasicTests(
    expectedReturns: Map<any, any>,
    functionToTest: Function,
  ): void {
    for (const [input, output] of expectedReturns.entries()) {
      test(`[${functionToTest.name}] Should return '${expectedReturns}'`, () => {
        expect(input)[typeof output === 'object' ? 'toEqual' : 'toBe'](output); // if output is a complexe object use 'toEqual' otherwise 'toBe'
      });
    }
  }
}
