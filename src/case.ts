export interface ICase {
  name: string;
  matcher: RegExp;
  splitter: RegExp | string;
}
