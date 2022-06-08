import { WordDefinitionProperties } from "../common/types";

export default class Banner {
  static bannerEl = document.querySelector<HTMLElement>('[data-banner]')!;
  static bannerText = this.bannerEl.querySelector<HTMLParagraphElement>('[data-banner-text]')!;
  static bannerCloseBtn = this.bannerEl.querySelector<HTMLButtonElement>('[data-banner-close-btn]')!;

  static display({ word, definition }: WordDefinitionProperties): void {
    Banner.bannerText.innerText = `${word}: ${definition}`;

    Banner.bannerEl.setAttribute('data-visible', '');

    Banner.bannerCloseBtn.addEventListener('click', () => {
      Banner.bannerEl.removeAttribute('data-visible');
    });
  }
}
