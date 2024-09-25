interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export default class JestRunner {
  private _classToInvoke: Type;

  constructor(classToInvoke: Type) {
    this._classToInvoke = classToInvoke;
  }

  public runBasicTests(expectedReturns: Map<any, any>, fn: Function): void {
    this.checkInvokation(fn);

    for (const [input, output] of expectedReturns.entries()) {
      test(`[${fn.name}] Should return '${output} for '${input}''`, () => {
        expect(
          this._classToInvoke[fn.name](
            ...(this.checkTypesLengthInInput(input) ? input : [input]),
          ),
        )[typeof output === 'object' ? 'toEqual' : 'toBe'](output); // if output is a complexe object use 'toEqual' otherwise 'toBe'
      });
    }
  }

  private checkTypesLengthInInput(input: any) {
    return (
      Array.isArray(input) &&
      Array.from(new Set(input.map((type) => typeof type)).values()).length > 1
    );
  }

  private checkInvokation(fn: Function) {
    // Throw error if _classToInvoke doesn't describe functionToTest or if prototype of functionToTest & function identified with name in _classToInvoke
    if (!this._classToInvoke[fn.name] || fn !== this._classToInvoke[fn.name])
      throw new Error(
        `${this._classToInvoke.name}.${fn.name} is not the expected tested one`,
      );
  }
}
