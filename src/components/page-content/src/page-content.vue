<template>
  <div class="page-content">
    <fca-table
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 1、header中的插槽  -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="medium"
          >新建用户</el-button
        >
        <el-button
          ><el-icon><RefreshRight /></el-icon
        ></el-button>
      </template>
      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ scope.row.createAt }}</span>
      </template>
      <template #updateAt="scope">
        <strong>{{ scope.row.updateAt }}</strong>
      </template>

      <template #handle="scope">
        <div class="handle-btns">
          <el-button v-if="isUpdate" size="mini" type="text">编辑</el-button>
          <el-button
            v-if="isDelete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在Page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </fca-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store";
import { usePermission } from "@/hooks/userPermission";
import FcaTable from "@/base-ui/table";
import moment from "moment";
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  components: {
    FcaTable,
  },
  setup(props) {
    const store = useStore();

    // 获取操作的权限
    const isCreate = usePermission(props.pageName, "create");
    const isUpdate = usePermission(props.pageName, "update");
    const isDelete = usePermission(props.pageName, "delete ");
    // const isQuery = usePermission(props.pageName, "query");

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageData());

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // if (!isQuery) return;
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo,
        },
      });
    };

    // 格式化格林威治时间
    const formatDate = (time: any) => {
      return moment.utc(time).local().format("YYYY-MM-DD");
    };

    // 格式化创建时间和更新时间
    const changeFormatDate = (val: any) => {
      val.map((item: { createAt: string; updateAt: string }) => {
        item.createAt = JSON.parse(JSON.stringify(formatDate(item.createAt)));
        item.updateAt = JSON.parse(JSON.stringify(formatDate(item.updateAt)));
      });
      return val;
    };

    getPageData();

    // 从vuex中获取数据
    const dataList = computed(() =>
      changeFormatDate(store.getters[`system/pageListData`](props.pageName))
    );

    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    );

    // 获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false;
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handle") return false;
      }
    );

    const handleDeleteClick = (item: any) => {
      console.log(item);
    };

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
    };
  },
});
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
}
</style>
