export default class ReadArea {
  evtName: String;
  customEvent: Event;
  mainEl: HTMLElement;

  // TS error
  constructor(evtSettings: Object) {
    const { eventName, customEvent } = evtSettings;
    this.evtName = eventName;
    this.customEvent = customEvent;

    this.mainEl = document.querySelector<HTMLElement>('[data-main]')!;
  }
}
