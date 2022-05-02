import { UploadBtn } from "./components/uploadBtn";

const app = document.querySelector<HTMLElement>('[data-main]')!;

// The UploadBtn class instantiation is just for more enhanced accessibility --
// it only toggles the `aria-expanded` attribute on the button.
// The options dropdown's reveal/hide is handled in the CSS.
new UploadBtn();

app.innerHTML = ``;

export {};
