<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/images/logo.png" alt="" />
      <span class="title" v-show="!menuFold">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="menuFold"
    >
      <template v-for="submenu in userMenus" :key="submenu.id">
        <!-- 二级菜单 -->
        <template v-if="submenu.type === 1">
          <!--  二级菜单的可以展开的标题 -->
          <el-sub-menu :index="submenu.id + ''">
            <template #title>
              <i :class="submenu.icon" v-if="submenu.icon"></i>
              <span>{{ submenu.name }}</span>
            </template>
            <template v-for="item in submenu.children" :key="item.id">
              <el-menu-item
                :index="item.id + ''"
                @click="handleItemClick(item)"
                >{{ item.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>

        <template v-else
          >s
          <el-menu-item :index="submenu.id + ''">{{
            submenu.name
          }}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "@/utils/map-menus";

export default defineComponent({
  props: {
    menuFold: {
      typeof: Boolean,
      default: false,
    },
  },
  name: "NavMenu",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const currentPath = route.path;
    const userMenus = computed(() => store.state.login.userMenus);

    const menu = pathMapToMenu(userMenus.value, currentPath);
    const defaultValue = ref(menu.id + "");

    const handleItemClick = (item: any) => {
      console.log(item.url);
      router.push({
        path: item.url ?? "/not-found",
      });
    };

    return {
      userMenus,
      handleItemClick,
      defaultValue,
    };
  },
});
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }
  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
