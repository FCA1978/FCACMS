import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { ISysyemState } from "./types";

import { deletePageData, getPageListData } from "@/service/main/system/system";

const systemModule: Module<ISysyemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
    };
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
    changeMenuList(state, list: any[]) {
      state.goodsList = list;
    },
    changeMenuCount(state, count: number) {
      state.goodsCount = count;
    },
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      // let pageUrl = "";
      // switch (pageName) {
      //   case "users":
      //     pageUrl = "/users/list";
      //     break;
      //   case "role":
      //     pageUrl = "/role/list";
      //     break;
      // }
      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data;

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);

      // switch (pageName) {
      //   case "users":
      //     commit("changeUserList", list);
      //     commit("changeUserCount", totalCount);
      //     break;
      //   case "role":
      //     commit(`changeRoleList`, list);
      //     commit(`changeRoleCount`, totalCount);
      //     break;
      // }

      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    },

    async deletePageDataAction({dispatch}, payload: any) {
      // 1.pageName -> /users
      // 2.id -> /users/id

      // 1.获取pageName 和 id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      

      // 2.调用删除网络请求
      await deletePageData(pageUrl);

      // 3.重新请求最新的数据
      dispatch('getPageListAction'),{
        pageName,
          queryInfo:{
            offset:0,
            size:10
          }
      }
    },
  },
};

export default systemModule;