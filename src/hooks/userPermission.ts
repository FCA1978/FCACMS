import { useStore } from "@/store";

export function usePermission(pageName: string, handleName: string) {
  const store = useStore();
  const permisions = store.state.login.permissions;
  const verifyPermission = `state,:${pageName}:${handleName}`;
  return !!permisions.find((item) => item === verifyPermission);
}
