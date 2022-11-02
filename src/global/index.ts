import type { App } from "vue";
import registerPropertites from "./register-propertites";

export default function (app: App): void {
  app.use(registerPropertites);
}
