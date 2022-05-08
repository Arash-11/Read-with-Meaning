import { StorageProperties } from "../common/types";

export default class Storage {

  constructor() {
    this.indexedDB = window.indexedDB || null;

    this.indexedDB ? this.openDbConnection() : this.handleIndexedDBNotSupported();
  }

  openDbConnection() {}

  addToDb() {}

  updateDb() {}

  deleteFromDb() {}

  handleIndexedDBNotSupported(): void {
    console.log('indexedDB is not available. Your text will not be saved.');
  }
}
