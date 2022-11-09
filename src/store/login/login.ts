import { Module } from "vuex";

import { ILoginState } from "./types";
import { IRootState } from "../types";
import { IAccount } from "@/service/login/type";

import localCache from "@/utils/cache";

import router from "@/router";

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId,
} from "@/service/login/login";

import { mapMenusToRoutes, mapMenuToPermissions } from "@/utils/map-menus";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus);

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route);
      });

      // 获取用户按钮的权限
      const permission = mapMenuToPermissions(userMenus);
      state.permissions = permission;
    },
  },
  actions: {
    // IAccount接口 声明payload的值的类型
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      localCache.setCache("token", token);

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);

      // 3.请求用户菜单
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id);
      const userMenus = userMenuResult.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);

      // 4.跳到首页
      router.push("/main");
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }

      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }

      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
  },
};

export default loginModule;
