import { StorageProperties, TextConstructor } from "../common/types";

export default class Controller {
  storage: StorageProperties;
  headerEl: HTMLElement;
  settingsEl: HTMLDivElement;
  mainEl: HTMLElement;
  formEl: HTMLFormElement;
  textAreaEl: HTMLTextAreaElement;
  extraFns: Array<TextConstructor>;
  text: string;

  constructor(storage: StorageProperties, extraFns: Array<TextConstructor> = []) {
    this.storage = storage;
    this.headerEl = document.querySelector<HTMLElement>('[data-header]')!;
    this.settingsEl = document.querySelector<HTMLDivElement>('[data-settings]')!;
    this.mainEl = document.querySelector<HTMLElement>('[data-main]')!;
    this.formEl = this.mainEl.querySelector<HTMLFormElement>('[data-input-form]')!;
    this.textAreaEl = this.formEl.querySelector<HTMLTextAreaElement>('[data-textarea]')!;

    this.extraFns = extraFns;

    this.text = '';

    this._bindEvents();
  }

  private _bindEvents(): void {
    this.formEl.addEventListener('submit', (e) => this._onFormSubmit.call(this, e));
  }

  private _onFormSubmit(e: Event): void {
    e.preventDefault();
    this.text = this.textAreaEl.value;
    this.setReadPage();
    if (this.extraFns.length) this.callExtraFns();
  }

  private _moveFocusToHeader(): void {
    this.headerEl.focus();
  }

  setReadPage(): void {
    this.settingsEl.classList.remove('hidden');

    const spanEl = document.createElement('span');
    spanEl.innerText = this.text;

    this.mainEl.classList.add('read-mode');
    this.mainEl.innerHTML = '';
    this.mainEl.append(spanEl);

    this._moveFocusToHeader();
  }

  callExtraFns(): void {
    this.extraFns.forEach(Fn => new Fn());
  }
}
