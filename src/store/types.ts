import { ILoginState } from "./login/types";
import { ISysyemState } from "./main/system/types";

export interface IRootState {
  name: string;
  age: number;
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISysyemState;
}

export type IStoreType = IRootState & IRootWithModule;
