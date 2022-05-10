import DictionaryApi from "../api/DictionaryApi";

export default class Text {
  text: string;
  dictionaryApi: object;

  constructor() {
    this.text = document.querySelector<HTMLSpanElement>('[data-main] > span')!.innerText;
    this.dictionaryApi = new DictionaryApi();

    this._bindEvents();
  }

  private _bindEvents(): void {}
}
