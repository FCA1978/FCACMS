<template>
  <div class="overview">
    <h2>overview</h2>
    <div
      class="pageContentTop"
      v-for="(item, index) in cardConfig"
      :key="index"
    >
      <quarter-card :cardConfig="item" :index="index"> </quarter-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { cardConfig } from "./config/top.config";
import QuarterCard from "@/base-ui/homepageCard";
export default defineComponent({
  name: "overview",
  components: {
    QuarterCard,
  },
  setup() {
    return {
      cardConfig,
    };
  },
});
</script>

<style scoped lang="less">
.pageContentTop {
  display: flex;
}
</style>
