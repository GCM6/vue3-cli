const statusMap = {
  400: "客户端语法错误",
  401: "登录失效",
};
export function checkStatus(status: number | string, msg: string): void {
  if (status == 401) {
    // 登录失效
  }
  //TODO 全局提示
}
