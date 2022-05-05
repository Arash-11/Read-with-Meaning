import debounce from "../utils/debounce";

export default class InputForm {
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
    this._bindEvents();
  }

  private _bindEvents(): void {
    this.formEl.addEventListener('submit', this._submitForm.bind(this));
    this.textAreaEl.addEventListener('keyup', this.handleTextArea.bind(this));
  }

  private _submitForm(): void {
    console.log('form submitted');
  }

  handleTextArea(): void {
    console.log('textarea changed');
  }
}
