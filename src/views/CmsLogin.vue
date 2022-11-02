<template>
  <div class="login">
    <login-user />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginUser from "./cpns/LoginUser.vue";

export default defineComponent({
  name: "CmsLogin",
  components: {
    LoginUser,
  },
});
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url(../assets/images/background_img.jpg) center center no-repeat;
  background-size: 100% 100%;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: -100px;
    h1 {
      text-align: center;
    }
    .el-tabs {
      width: 320px;
    }
    .login-select {
      display: flex;
      margin-top: 5px;
      color: yellowgreen;
      justify-content: space-between;
    }
    .login-commit {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>
