<template>
  <div class="quarter-card">
    <div class="cardTitle">
      <div class="titleLeft">
        <span>左标题</span>
      </div>
      <div class="titleRight">
        <span>右标题</span>
      </div>
    </div>
    <div class="cardData"></div>
    <div class="cardBottom"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "",
});
</script>
<style lang="less" scoped>
.quarter-card {
  background-color: #ffffff;
  border: 1px solid blue;
}
</style>
