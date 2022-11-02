<template>
  <div class="role">
    <page-search :formConfig="formConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import { formConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
  name: "role",
  components: {
    PageContent,
    PageSearch,
  },
  setup() {
    return {
      formConfig,
      contentTableConfig,
    };
  },
});
</script>

<style scoped></style>
