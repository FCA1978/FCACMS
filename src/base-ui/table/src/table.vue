<template>
  <div class="fca-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ background: '#EEF5FD' }"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        label="序号"
        width="60"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ITableItem } from "../types";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    listData: {
      type: Array,
      required: true,
    },
    propList: {
      //这里采用PropType是为了类型推论，让使用属性的时候获取更丰富的类型提示
      type: Array as PropType<ITableItem[]>,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    listCount: {
      type: Number,
      default: 0,
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 }),
    },
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("selectionChange", value);
    };

    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };

    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };

    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style lang="less" scoped>
.footer {
  padding-top: 5px;
  float: right;
}
.header {
  justify-content: space-between;
  display: flex;
  padding-bottom: 5px;
}
</style>
