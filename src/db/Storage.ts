import { StorageProperties } from "../common/types";

export default class Storage {
  indexedDB: IDBFactory;
  IDBTransaction: {
    new(): IDBTransaction;
    prototype: IDBTransaction;
  };

  constructor() {
    this.indexedDB = window.indexedDB;
    this.IDBTransaction = window.IDBTransaction;
    this.db = null;

    this.indexedDB ? this.openDbConnection() : this.handleIndexedDBNotSupported();
  }

  openDbConnection() {
    const openRequest = this.indexedDB.open('readWithMeaning', 4);

    openRequest.onupgradeneeded = (event) => {
      // the existing database version is less than 4 (or it doesn't exist)
      this.db = openRequest.result;
      switch(event.oldVersion) { // existing db version
        case 0:
          // version 0 means that the client had no database
          // perform initialization
        case 1:
          // client had version 1
          // update
        case 2:
          // client had version 2
          // update
        case 3:
          // client had version 3
          // update
      }
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };

    openRequest.onerror = () => {
      console.error("Error", openRequest.error);
    };
  }

  addToDb() {
  }

  updateDb() {}

  deleteFromDb() {}

  handleIndexedDBNotSupported(): void {
    console.warn('indexedDB is not available. Your text will not be saved.');
  }
}
