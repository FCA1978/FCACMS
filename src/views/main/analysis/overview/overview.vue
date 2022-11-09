<template>
  <div class="overview">
    <h2>overview</h2>
    <div>
      <quarter-card></quarter-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QuarterCard from "@/base-ui/homepageCard";

export default defineComponent({
  name: "overview",
  components: {
    QuarterCard,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
