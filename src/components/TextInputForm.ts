export default class TextInputForm {
  formEl: HTMLFormElement;
  textAreaEl: HTMLTextAreaElement;
  submitBtn: HTMLButtonElement;

  constructor() {
    this.formEl = document.querySelector<HTMLFormElement>('[data-input-form]')!;
    this.textAreaEl = this.formEl.querySelector<HTMLTextAreaElement>('[data-textarea]')!;
    this.submitBtn = this.formEl.querySelector<HTMLButtonElement>('[data-form-btn]')!;

    this.init();
  }

  init(): void {
    this.textAreaEl.addEventListener('input', this.handleTextArea.bind(this));
  }

  handleTextArea(): void {
    this.textAreaEl.value
      ? this.submitBtn.removeAttribute('disabled')
      : this.submitBtn.setAttribute('disabled', '');
  }
}
