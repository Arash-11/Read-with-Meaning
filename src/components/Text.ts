import { DictionaryApiProperties } from "../common/types";
import DictionaryApi from "../api/DictionaryApi";

interface WordDefinitionProperties {
  word: string;
  definition: string | void | null;
}

export default class Text {
  mainEl: HTMLElement;
  textWrapperEl: HTMLParagraphElement;
  text: string;
  dictionaryApi: DictionaryApiProperties;

  constructor() {
    this.mainEl = document.querySelector<HTMLElement>('[data-main]')!;
    this.textWrapperEl = this.mainEl.querySelector<HTMLParagraphElement>('[data-text]')!;
    this.text = this.textWrapperEl.innerText;
    this.dictionaryApi = new DictionaryApi();

    this.wrapNodesInTags();
    this._bindEvents();
  }

  private _bindEvents(): void {
    this.textWrapperEl.addEventListener('click', (e) => this.handleTextClick.call(this, e));
  }

  wrapNodesInTags(): void {
    this.textWrapperEl.childNodes.forEach(childNode => {
      if (childNode.textContent == null) return;

      if (childNode.nodeName === '#text') {
        const pEl: HTMLParagraphElement = document.createElement('p');
        pEl.innerHTML = childNode.textContent;
        childNode.replaceWith(pEl);
      } else if (childNode.nodeName === 'BR') {
        const pEl: HTMLParagraphElement = document.createElement('p');
        pEl.classList.add('empty-para');
        pEl.innerHTML = '\n';
        childNode.replaceWith(pEl);
      }
    });
  }

  get selectedWord(): string {
    const selection = window.getSelection()!;
    const range = selection.getRangeAt(0);
    const node = selection.anchorNode!;

    const { startOffset } = range;
    const { textContent } = node;

    const lettersOnlyRegex = /^[a-zA-Z]+$/;

    if (!textContent?.trim()) return '';

    // Limit `endOffset` to additional 50 boundary points in the range.
    // This is to avoid grabbing entire large batches of texts unnecessarily, since doing that
    // will cause performance issues with large amounts of text (eg. a 50-page PDF).
    const endOffset = startOffset + 50;
    let rangeStartText = '';
    let word = null;

    // If start of text (i.e. area right before the first letter of the first word) is clicked,
    // select the first word in the text.
    if (startOffset === 0) {
      const textToProcess = textContent.substring(0, endOffset);
      word = textToProcess.match(/(\w+)/g)![0];
    } else {
      // Iterate backwards from the position (i.e. the letter in a word) that was clicked
      // until a non-letter is encountered -- eg. a space (which will probably mean the start of a word),
      // a punctuation mark, words with numbers in them that aren't in the dictionary, etc.
      for (let i = startOffset; lettersOnlyRegex.test(textContent.substring(i - 1, i)); i--) {
        rangeStartText = textContent.substring(i - 1, endOffset);
        // Break out of the loop if you've reached the start of the first word in the text.
        // This will be used when you click anywhere in the first letter in the text,
        // except the area right before the first letter.
        if (i === 0) {
          rangeStartText = textContent.substring(0, endOffset);
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

    // Only letters are accepted at the moment (numbers, symbols, etc. are invalid).
    if ( !lettersOnlyRegex.test(word) ) return '';

    return word.trim().toLowerCase();
  }

  async getWordDefinition(): Promise<WordDefinitionProperties> {
    const word: string = this.selectedWord;

    const definition = word === ''
      ? null
      : await this.dictionaryApi.getDefinition(word);

    return { word, definition };
  }

  async handleTextClick(e: MouseEvent | PointerEvent): Promise<void> {
    // Ignore any additional consecutive additional clicks.
    // This will help prevent the `getWordDefinition` function from unnecessarily firing more than once
    // (eg. when a user double clicks to highlight a word).
    if (e.detail > 1) return;

    const { word, definition } = await this.getWordDefinition();

    if (!word || !definition) return;

    console.log(`${word}: ${definition}`);
  }
}
