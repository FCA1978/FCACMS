import { App } from "vue";
import { formatUtcString } from "@/utils/date-format";

export default function registerDirectives(app: App): void {
  app.config.globalProperties.$formatUTC = function (
    data: string,
    formatString = "YYYY-MM-DD HH:mm:ss"
  ) {
    return formatUtcString(data, formatString);
  };
}
