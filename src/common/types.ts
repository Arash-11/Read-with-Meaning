export interface StorageProperties {}

export interface TextProperties {
  text: string;
}

export interface TextConstructor {
  new (): TextProperties;
}
