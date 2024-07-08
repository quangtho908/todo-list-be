import { MethodType, RouteType } from "../types";

export function Method(
  method: MethodType,
  path: string = ""
) {
  return function (target: Object, propertyKey: string) {

    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor)
    }

    const routesData: RouteType[] = Reflect.getMetadata("routes", target.constructor);

    routesData.push({
      method,
      path,
      methodName: propertyKey
    })

    Reflect.defineMetadata("routes", routesData, target.constructor)
  }
}