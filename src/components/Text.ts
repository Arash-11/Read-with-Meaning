import { TextProperties } from "../common/types";

export default class Text implements TextProperties {
  text: string;

  constructor() {
    this.text = document.querySelector<HTMLSpanElement>('[data-main] > span')!.innerText;
  }
}
