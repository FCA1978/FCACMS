<!-- 首页顶部卡片1/4 -->
<template>
  <div class="quarter-card">
    <div class="cardTitle">
      <div class="titleLeft">
        <span>左标题</span>
      </div>
      <div class="titleRight">
        <el-icon><Warning /></el-icon>
      </div>
    </div>
    <div class="cardData">
      <div class="cardNumber">
        <span>123456</span>
      </div>
      <div class="dataChart">
        <div>week radio</div>
        <div>day radio</div>
      </div>
    </div>
    <div class="cardBottom">
      <div>DAY SALES 12,432</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ICardItem } from "../types";
export default defineComponent({
  name: "",
  props: {
    cardConfig: {
      type: Array as PropType<ICardItem[]>,
      default: () => [],
    },
    index: {
      type: String,
      required: true,
    },
  },
});
</script>
<style lang="less" scoped>
.quarter-card {
  background-color: #ffffff;
  border: 1px solid blue;
  width: 25%;
  margin-right: 20px;
}

.cardTitle {
  display: flex;
  justify-content: space-between;
}

.titleLeft {
  padding: 10px 0 20px 20px;
}

.titleRight {
  padding: 10px 20px 20px 0;
}

.cardData {
  height: 120px;
  padding-left: 20px;
  .dataChart {
    padding-top: 20px;
  }
}

.cardBottom {
  padding-top: 20px;
  padding-left: 30px;
}
</style>
