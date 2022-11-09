<template>
  <div class="page-search">
    <div class="search">
      <fca-form v-bind="formConfig" v-model="formData">
        <template #header>
          <div class="header">
            <el-icon :size="32"><Search /></el-icon>
            <h2>检索条件</h2>
          </div>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button @click="handleResetClick">重置</el-button>
            <el-button @click="handleQueryClick" type="primary">搜索</el-button>
          </div>
        </template>
      </fca-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import FcaForm from "@/base-ui/form";

export default defineComponent({
  props: {
    formConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    FcaForm,
  },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    // 双向绑定属性应该是有配置文件的field来决定
    const formItems = props.formConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.filed] = "";
    }

    const formData = ref(formOriginData);

    // 当用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData;
      emit("resetBtnClick");
    };

    // 当用户点击搜索
    const handleQueryClick = () => {
      emit("queryBtnClick", formData.value);
    };

    return {
      formData,
      handleResetClick,
      handleQueryClick,
    };
  },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.handle-btns {
  text-align: right;
}
</style>
