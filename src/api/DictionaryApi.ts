export default class DictionaryApi {
  apiBaseEndpoint: URL;

  constructor() {
    const baseUrl = 'https://api.dictionaryapi.dev';
    this.apiBaseEndpoint = new URL('/api/v2/entries/en/', baseUrl);
  }

  async getDefinition(word: string): Promise<string | void> {
    const url = this.createRequestURL(word);

    try {
      const response = await fetch(url);
      const result = await response.json();
      const { definition } = result[0].meanings[0].definitions[0];
      return definition;
    } catch (error) {
      return console.error(error);
    }
  }

  createRequestURL(word: string) {
    const requestEndpoint: URL = new URL(word, this.apiBaseEndpoint.href);
    return requestEndpoint.href;
  }
}
