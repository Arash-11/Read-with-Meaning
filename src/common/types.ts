export interface StorageProperties {}

export interface DictionaryApiProperties {
  apiBaseEndpoint: URL;
  getDefinition: (arg0: string) => Promise<string | void>;
  createRequestURL: (arg0: string) => string;
}

export interface WordDefinitionProperties {
  word: string;
  definition: string | void | null;
}
