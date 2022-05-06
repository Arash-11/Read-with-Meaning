export default class TextInputForm {
  event: Event;
  formEl: HTMLFormElement;
  textAreaEl: HTMLTextAreaElement;
  submitBtn: HTMLButtonElement;

  constructor(event: Event) {
    this.event = event;

    this.formEl = document.querySelector<HTMLFormElement>('[data-input-form]')!;
    this.textAreaEl = this.formEl.querySelector<HTMLTextAreaElement>('[data-textarea]')!;
    this.submitBtn = this.formEl.querySelector<HTMLButtonElement>('[data-form-btn]')!;

    this.init();
  }

  init(): void {
    this._bindEvents();
  }

  private _bindEvents(): void {
    this.formEl.addEventListener('submit', (e) => this._submitForm.call(this, e));
    this.textAreaEl.addEventListener('keyup', this.handleTextArea.bind(this));
  }

  private _submitForm(e: Event): void {
    e.preventDefault();
    window.dispatchEvent(this.event);
  }

  handleTextArea(): void {
    this.textAreaEl.value
      ? this.submitBtn.removeAttribute('disabled')
      : this.submitBtn.setAttribute('disabled', '');
  }
}
