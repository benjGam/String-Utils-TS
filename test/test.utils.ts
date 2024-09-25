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

    const isMultiArgs = this.checkTypesLengthInInput(
      Array.from(expectedReturns.keys())[0],
    );

    for (const [input, output] of expectedReturns.entries()) {
      test(`[${fn.name}] Should return '${output} for '${input}''`, () => {
        expect(
          this._classToInvoke[fn.name](
            ...(isMultiArgs ? input.flat() : [input]),
          ),
        )[typeof output === 'object' ? 'toEqual' : 'toBe'](output); // if output is a complexe object use 'toEqual' otherwise 'toBe'
      });
    }
  }

  private checkTypesLengthInInput(input: any) {
    return Array.isArray(input[0]);
  }

  private checkInvokation(fn: Function) {
    // Throw error if _classToInvoke doesn't describe functionToTest or if prototype of functionToTest & function identified with name in _classToInvoke
    if (!this._classToInvoke[fn.name] || fn !== this._classToInvoke[fn.name])
      throw new Error(
        `${this._classToInvoke.name}.${fn.name} is not the expected tested one`,
      );
  }
}
