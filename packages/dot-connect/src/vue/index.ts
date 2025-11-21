import type { ConnectionButton } from "../elements/connection-button.js";
import type { ConnectionDialog } from "../elements/connection-dialog.js";
import type { DefineCustomElement } from "./define-custom-element.js";

declare module "vue" {
  interface GlobalComponents {
    "dc-connection-button": DefineCustomElement<ConnectionButton>;
    "dc-connection-dialog": DefineCustomElement<
      ConnectionDialog,
      { close: CloseEvent }
    >;
  }
}
