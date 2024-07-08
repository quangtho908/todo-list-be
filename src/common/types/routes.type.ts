export type MethodType = "get" | "post" | "put" | "delete"

export type RouteType = {
  method: MethodType,
  path: string
  methodName: string
}