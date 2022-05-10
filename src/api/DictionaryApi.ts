export default class DictionaryApi {
  apiEndpoint: object;

  constructor() {
    const baseUrl = 'https://api.dictionaryapi.dev';
    this.apiEndpoint = new URL('/api/v2/entries/en/', baseUrl);
  }

  sendRequest() {
    console.log(this.apiEndpoint);
  }
}
