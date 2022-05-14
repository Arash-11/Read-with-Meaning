export default class DictionaryApi {
  apiBaseEndpoint: URL;

  constructor() {
    const baseUrl = 'https://api.dictionaryapi.dev';
    this.apiBaseEndpoint = new URL('/api/v2/entries/en/', baseUrl);
  }

  getDefinition(word: string): string {
    const url = this.createRequestURL(word);

    return url;
  }

  createRequestURL(word: string) {
    const { href: baseHref } = this.apiBaseEndpoint;
    const requestEndpoint: URL = new URL(word, baseHref);
    const { href: requestHref } = requestEndpoint;

    return requestHref;
  }
}
