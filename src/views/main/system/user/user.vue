<template>
  <div class="user">
    <page-search
      :formConfig="formConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { formConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { usePageSearch } from "@/hooks/usePageSearch";

export default defineComponent({
  name: "users",
  components: {
    PageSearch,
    PageContent,
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();

    return {
      formConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
    };
  },
});
</script>

<style scoped></style>
