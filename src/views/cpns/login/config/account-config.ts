// 规则
import { reactive } from "vue";
import type { FormRules } from "element-plus";
export const AccountsRules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "用户名是必填内容",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: "用户名必须是5-10个字母或者数字",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码是必填内容",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "密码必须是3位以上字母或者数字",
      trigger: "blur",
    },
  ],
});
