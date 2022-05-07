import { StorageProperties } from "../common/types";

export default class Controller {
  storage: StorageProperties;
  addNewLink: HTMLAnchorElement;
  mainEl: HTMLElement;
  formEl: HTMLFormElement;
  textAreaEl: HTMLTextAreaElement;
  text: string;

  constructor(storage: StorageProperties) {
    this.storage = storage;
    this.addNewLink = document.querySelector<HTMLAnchorElement>('[data-add-new]')!;
    this.mainEl = document.querySelector<HTMLElement>('[data-main]')!;
    this.formEl = this.mainEl.querySelector<HTMLFormElement>('[data-input-form]')!;
    this.textAreaEl = this.formEl.querySelector<HTMLTextAreaElement>('[data-textarea]')!;

    this.text = '';

    this._bindEvents();
  }

  private _bindEvents(): void {
    this.formEl.addEventListener('submit', (e) => this._onFormSubmit.call(this, e));
  }

  private _onFormSubmit(e: Event): void {
    e.preventDefault();
    this.text = this.textAreaEl.value;
    this.goToReadPage();
  }

  goToReadPage(): void {
    this.mainEl.innerHTML = this.text;
    this.addNewLink.classList.remove('hidden');
  }
}
