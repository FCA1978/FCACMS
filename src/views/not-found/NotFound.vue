<template>
  <div class="not-find">
    <iframe
      id="iframe"
      src="http://www.hdqt.co.uk/404/"
      frameborder="0"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "NotFind",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.not-find {
  width: 100%;
  height: 100%;
}
</style>
