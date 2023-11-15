export default class StringFormatter {
  private static pluralRefToSingular = {
    sses: 'ss',
    ies: 'y',
    es: 'e',
    s: '',
  };

  public static pluralize(toPluralize: string) {
    if (this.isPlural(toPluralize)) return toPluralize;

    const wordEnding = this.getEnding(toPluralize);
    toPluralize = this.removeEndDuplications(toPluralize, wordEnding);

    return toPluralize.replace(
      new RegExp(`(${wordEnding})$`),
      this.getPluralOf(wordEnding),
    );
  }

  public static singularize(toSingularize: string) {
    if (this.isSingular(toSingularize)) return toSingularize;

    const wordEnding = this.getEnding(toSingularize);
    toSingularize = this.removeEndDuplications(toSingularize, wordEnding);

    return toSingularize.replace(
      new RegExp(`(${wordEnding})$`),
      this.getSingularOf(wordEnding),
    );
  }

  public static formatWord(word: string) {
    if (word.length < 2) return word;

    const wordExceptFirstChar = word.slice(1, word.length);
    return `${word[0].toUpperCase()}${wordExceptFirstChar.toLowerCase()}`;
  }

  public static formatEachWords(completeString: string, separator = ' ') {
    return completeString
      .split(separator)
      .map((word) => this.formatWord(word))
      .join(separator);
  }

  private static getEnding(toExtractFrom: string) {
    const managedEnding = Object.keys(this.pluralRefToSingular);
    managedEnding.push(...Object.values(this.pluralRefToSingular));
    return managedEnding.find((ending) => toExtractFrom.endsWith(ending));
  }

  public static isPlural(toCheck: string): boolean {
    return (
      Object.keys(this.pluralRefToSingular).find((pluralEnding) =>
        toCheck.endsWith(pluralEnding),
      ) !== undefined
    );
  }

  public static isSingular(toCheck: string) {
    return !this.isPlural(toCheck);
  }

  public static getSingularOf(pluralEnding: string) {
    return this.pluralRefToSingular[pluralEnding];
  }

  public static getPluralOf(singularEnding: string) {
    return Object.keys(this.pluralRefToSingular).find(
      (key) => singularEnding == this.pluralRefToSingular[key],
    );
  }

  public static removeEndDuplications(toAnalyze: string, toRemove: string) {
    const regex = new RegExp(`(${toRemove})+$`);
    return toAnalyze.replace(regex, '') + toRemove;
  }

  public static isCamelCase(toAnalyze: string) {
    const camelCaseRegex = new RegExp(/^[a-z]+(?:[A-Z][a-z]+)*$/);
    return toAnalyze.match(camelCaseRegex) != null;
  }

  public static isPascalCase(toAnalyze: string) {
    const pascalCaseRegex = new RegExp(/^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/);
    return toAnalyze.match(pascalCaseRegex) != null;
  }
}