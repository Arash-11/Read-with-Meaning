import { UploadBtn } from "./components/UploadBtn";
import { URLForm } from "./components/URLForm";

const app = document.querySelector<HTMLElement>('[data-main]')!;

// The UploadBtn class instantiation is just for more enhanced accessibility --
// it only toggles the `aria-expanded` attribute on the button.
// The options dropdown's reveal/hide is handled in the CSS.
new UploadBtn();

const urlForm = new URLForm();

app.append(urlForm.el);

export {};
