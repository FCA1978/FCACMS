<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        class="avatar"
        size="small"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <span>{{ name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon><Promotion /></el-icon>
          退出登录
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><User /></el-icon>
          用户信息</el-dropdown-item
        >
        <el-dropdown-item>
          <el-icon><Setting /></el-icon>
          系统管理
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";
export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const name = computed(() => store.state.login.userInfo.name);

    return {
      name,
    };
  },
});
</script>

<style scoped>
.el-dropdown-link {
  display: flex;
  align-items: center;
}
.avatar {
  display: block;
  margin-right: 10px;
}
</style>
