import DictionaryApi from "../api/DictionaryApi";

export default class Text {
  mainEl: HTMLElement;
  text: string;
  dictionaryApi: object;

  constructor() {
    this.mainEl = document.querySelector<HTMLElement>('[data-main]')!;
    this.text = this.mainEl.querySelector<HTMLSpanElement>('span')!.innerText;
    this.dictionaryApi = new DictionaryApi();

    this._bindEvents();
  }

  private _bindEvents(): void {
    // ['dblclick', 'mouseup'].forEach((event) => {
    //   this.mainEl.addEventListener(event, (e: Event) => {
    //     // This is mostly to prevent the `mouseup` event from firing when `dbclick` is what we want to fire.
    //     // According to MDN:
    //     // "If several listeners are attached to the same element for the same event type,
    //     // they are called in the order in which they were added."
    //     e.stopImmediatePropagation();
    //     console.log('e: ', e);
    //     return this.getWordDefinition.call(this);
    //   });
    // });

    this.mainEl.addEventListener('click', this.getWordDefinition.bind(this));
  }

  get selectedWord(): string {
    const selection = window.getSelection()!;
    const range = selection.getRangeAt(0);
    const node = selection.anchorNode!;

    const { startOffset } = range;
    const { textContent } = node;

    let rangeStart = null;
    let word = null;

    // console.log(startOffset);

    if (startOffset === 0) {
      word = textContent?.match(/(\w+)/g)![0];
    } else {
      for (let i = startOffset; textContent?.substring(i === 0 ? 0 : i - 1, i) !== ' '; i--) {
        rangeStart = textContent?.substring(i - 1);
      }

      // Find word
      word = rangeStart!.match(/(\w+)/g)![0];
    }

    console.log(word);
    

    // return word;
  }

  getWordDefinition(): void {
    const word: string = this.selectedWord;
    // console.log(word);

    // this.dictionaryApi.sendRequest(this.highlightedText);
  }
}
