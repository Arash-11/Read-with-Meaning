import DictionaryApi from "../api/DictionaryApi";

interface WordDefinitionProperties {
  word: string;
  definition: string;
}

export default class Text {
  mainEl: HTMLElement;
  textWrapperEl: HTMLParagraphElement;
  text: string;
  dictionaryApi: object;

  constructor() {
    this.mainEl = document.querySelector<HTMLElement>('[data-main]')!;
    this.textWrapperEl = this.mainEl.querySelector<HTMLParagraphElement>('[data-text]')!;
    this.text = this.textWrapperEl.innerText;
    this.dictionaryApi = new DictionaryApi();

    this.wrapNodesInTags();
    this._bindEvents();
  }

  private _bindEvents(): void {
    this.mainEl.addEventListener('click', this.handleTextClick.bind(this));
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
      // Iterate backwards from the position (i.e. the letter in a word) that was clicked,
      // until an empty space is encountered -- this indicates we've reached the start of a word.
      for (let i = startOffset; textContent.substring(i - 1, i) !== ' '; i--) {
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

    return word.trim().toLowerCase();
  }

  async getWordDefinition(): Promise<WordDefinitionProperties | void> {
    const word: string = this.selectedWord;

    const definition = word === ''
      ? null
      : await this.dictionaryApi.getDefinition(word);

    return { word, definition };
  }

  async handleTextClick(): Promise<void> {    
    const { word, definition } = await this.getWordDefinition();

    if (!word || !definition) return;

    console.log(`${word}: ${definition}`);
  }
}
