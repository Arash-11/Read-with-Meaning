import { StorageProperties } from "./common/types";
import Storage from "./db/Storage";
import Controller from "./controller/Controller";
import Settings from "./components/Settings";
import TextInputForm from "./components/TextInputForm";

const storage: StorageProperties = new Storage();

new Settings();

new TextInputForm();

new Controller(storage);

export {};
