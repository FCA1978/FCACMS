import fcaRequest from "../../index";

import { IDataType } from "../../types";

export function getPageListData(url: string, queryInfo: any) {
  return fcaRequest.post<IDataType>({
    url: url,
    data: queryInfo,
  });
}

export function deletePageData(url:string) {
    return fcaRequest.delete<IDataType>({
      url: url
    });
}
