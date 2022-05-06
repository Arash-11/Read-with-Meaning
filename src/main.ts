import TextInputForm from "./components/TextInputForm";
import ReadArea from "./components/ReadArea";

const evtName = 'textsubmit'
const customSubmitEvt: Event = new Event(evtName);

new TextInputForm(customSubmitEvt);

new ReadArea({
  eventName: evtName,
  customEvent: customSubmitEvt
});

window.addEventListener(evtName, () => console.log('custom event fired'));

export {};
