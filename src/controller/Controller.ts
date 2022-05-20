import { StorageProperties } from "../common/types";
import Text from "../components/Text";

export default class Controller {
  storage: StorageProperties;
  headerEl: HTMLElement;
  settingsEl: HTMLDivElement;
  mainEl: HTMLElement;
  formEl: HTMLFormElement;
  textAreaEl: HTMLTextAreaElement;
  text: string;

  constructor(storage: StorageProperties) {
    this.storage = storage;
    this.headerEl = document.querySelector<HTMLElement>('[data-header]')!;
    this.settingsEl = document.querySelector<HTMLDivElement>('[data-settings]')!;
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
    this.setReadingPage();
    this.initReadingText();
  }

  private _moveFocusToHeader(): void {
    this.headerEl.focus();
  }

  wrapNodesInTags(wrapperEl: HTMLDivElement): void {
    wrapperEl.childNodes.forEach(childNode => {
      if (childNode.textContent == null) return;

      if (childNode.nodeName === '#text') {
        const pEl: HTMLParagraphElement = document.createElement('p');
        pEl.innerHTML = childNode.textContent;
        childNode.replaceWith(pEl);
      } else if (childNode.nodeName === 'BR') {
        const pEl: HTMLParagraphElement = document.createElement('p');
        pEl.classList.add('empty-para');
        pEl.innerHTML = '\n';
        childNode.replaceWith(pEl);
      }
    });
  }

  setReadingPage(): void {
    this.settingsEl.classList.remove('hidden');

    const textWrapperEl = document.createElement('div');
    textWrapperEl.setAttribute('data-text', '');
    textWrapperEl.innerText = this.text;

    this.mainEl.classList.add('read-mode');
    this.mainEl.innerHTML = '';
    this.mainEl.append(textWrapperEl);

    this.wrapNodesInTags(textWrapperEl);

    this._moveFocusToHeader();

    // this.setPageHistory();
  }

  initReadingText(): void {
    new Text();
  }

  // setPageHistory(): void {
  //   const url = new URL('/read', window.location.href);
  //   window.history.pushState({}, '', url);
  // }
}
