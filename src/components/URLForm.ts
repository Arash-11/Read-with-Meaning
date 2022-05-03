export class URLForm {
  el: HTMLFormElement;

  constructor() {
    this.el = this.createFormEl();
    this._bindEvents();
  }

  private _bindEvents(): void {
    this.el.addEventListener('submit', this.submitForm.bind(this));
  }

  createFormEl(): HTMLFormElement {
    const formClassname = 'url-form';
    const formLabelText = 'Enter a URL';
    const formBtnText = 'Start reading';

    const formEl: HTMLFormElement = document.createElement('form');
    const formElContentStr = `
      <label for="url" class="${formClassname}__label">${formLabelText}</label>
      <input type="url" id="url" class="${formClassname}__input" />
      <button type="submit" class="${formClassname}__btn">${formBtnText}</button>
    `;
    const parser: DOMParser = new DOMParser();
    const formElContent: string = parser.parseFromString(formElContentStr, 'text/html').body.innerHTML;

    formEl.setAttribute('data-url-form', '');
    formEl.classList.add(formClassname);
    formEl.innerHTML = formElContent;

    return formEl;
  }

  submitForm(): void {
    console.log('form submitted');
  }
}
