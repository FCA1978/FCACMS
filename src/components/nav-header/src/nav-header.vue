<template>
  <div class="nav-header">
    <el-icon class="fold-menu" v-if="isFold" @click="handleFoldClick"
      ><Expand
    /></el-icon>
    <el-icon class="fold-menu" v-else @click="handleFoldClick"
      ><Fold
    /></el-icon>

    <div class="content">
      <fca-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import UserInfo from "./user-info.vue";
import FcaBreadcrumb from "@/base-ui/breadcrumb";
import { useStore } from "@/store";
import { pathMapBreadcrubms } from "@/utils/map-menus";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "App",
  emits: ["foldChange"],
  components: {
    UserInfo,
    FcaBreadcrumb,
  },
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };

    //面包屑的数据:[{name:,path:}]
    const store = useStore();

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return pathMapBreadcrubms(userMenus, currentPath);
    });

    return {
      isFold,
      handleFoldClick,
      breadcrumbs,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
  }
}
</style>
