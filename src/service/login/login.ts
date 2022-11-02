import fcaRequest from "../index";
import { IAccount, ILoginResult } from "./type";
import { IDataType } from "../types";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/", //用法：role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return fcaRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return fcaRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
  });
}

export function requestUserMenuByRoleId(id: number) {
  return fcaRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
  });
}
