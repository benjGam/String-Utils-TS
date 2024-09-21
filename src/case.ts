export interface ICase {
  name: string;
  matcher: RegExp;
  splitter: RegExp | string;
}

export const knownCases: ICase[] = [
  {
    name: 'snakeCase',
    matcher: /[a-zA-Z]+(?:_[a-zA-Z]+)*/,
    splitter: /_/,
  },
  {
    name: 'pascalCase',
    matcher:
      /[A-Z]([A-Z0-9]*[a-z][a-z0-9]*[A-Z]|[a-z0-9]*[A-Z][A-Z0-9]*[a-z])[A-Za-z0-9]*/,
    splitter: /([A-Z]+[a-z]*)/,
  },
  {
    name: 'camelCase',
    matcher: /[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/,
    splitter: /([A-Z]+[a-z]*)/,
  },
];
