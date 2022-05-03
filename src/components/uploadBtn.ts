export class UploadBtn {
  el: HTMLElement;
  btn: HTMLElement;

  constructor() {
    this.el = document.querySelector<HTMLElement>('[data-upload]')!;
    this.btn = this.el.querySelector<HTMLElement>('[data-upload-btn]')!;
    this._bindEvents();
  }

  private _bindEvents(): void {
    this.el.addEventListener('mouseover', this.expandDropdown.bind(this));
    this.el.addEventListener('mouseout', this.shrinkDropdown.bind(this));
    this.el.addEventListener('focusin', this.expandDropdown.bind(this));
    this.el.addEventListener('focusout', this.shrinkDropdown.bind(this));
  }

  get isDropdownInFocus(): Boolean {
    return !!document.querySelector('[data-upload]:focus-within');
  }

  expandDropdown(): void {
    this.btn.setAttribute('aria-expanded', 'true');
  }

  shrinkDropdown(): void {
    if (!this.isDropdownInFocus) this.btn.setAttribute('aria-expanded', 'false');
  }
}
