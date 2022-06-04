export default class Settings {
  el: HTMLDivElement;
  btn: HTMLButtonElement;

  constructor() {
    this.el = document.querySelector<HTMLDivElement>('[data-settings]')!;
    this.btn = this.el.querySelector<HTMLButtonElement>('[data-settings-btn]')!;

    this._bindEvents();
  }

  private _bindEvents(): void {
    this.el.addEventListener('mouseover', this.expandDropdown.bind(this));
    this.el.addEventListener('mouseout', this.shrinkDropdown.bind(this));
    this.el.addEventListener('focusin', this.expandDropdown.bind(this));
    this.el.addEventListener('focusout', this.shrinkDropdown.bind(this));
  }

  get isDropdownInFocus(): boolean {
    return !!document.querySelector('[data-settings]:focus-within');
  }

  expandDropdown(): void {
    this.btn.setAttribute('aria-expanded', 'true');
  }

  shrinkDropdown(): void {
    if (!this.isDropdownInFocus) this.btn.setAttribute('aria-expanded', 'false');
  }
}
