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
    this.mainEl.addEventListener('click', this.getWordDefinition.bind(this));
  }

  get selectedWord(): string {
    const selection = window.getSelection()!;
    const range = selection.getRangeAt(0);
    const node = selection.anchorNode!;

    const { startOffset } = range;
    const { textContent } = node;

    if (!textContent) return '';

    let rangeStartText = '';
    let word = null;

    // If start of text is clicked, select the first word in the text.
    if (startOffset === 0) {
      word = textContent.match(/(\w+)/g)![0];
    } else {
      // Iterate backwards from the position (basically, the letter in a word) that was clicked,
      // until an empty space is encountered -- this indicates we've reached the start of a word.
      for (let i = startOffset; textContent?.substring(i - 1, i) !== ' '; i--) {
        rangeStartText = textContent.substring(i - 1);
        // Break out of the loop if you've reached the start of the first word in the text.
        if (i === 0) {
          rangeStartText = textContent;
          break;
        }
      }

      // If a user highlights a text, set the word to that highlighted text.
      // Otherwise, it will be the first word in the "cut-off" text that we got after
      // iterating backwards, as defined in the for-loop above, or an empty string.
      word = selection.toString()
        ? selection.toString()
        : rangeStartText
        ? rangeStartText.match(/(\w+)/g)![0]
        : '';
    }

    return word.trim();
  }

  getWordDefinition(): void {
    const word: string = this.selectedWord;

    this.dictionaryApi.getDefinition(word);
  }
}
