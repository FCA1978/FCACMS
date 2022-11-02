<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBreadcrumb } from "../types";
export default defineComponent({
  name: "App",
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
