export function Req(key: string = "") {
  return function (target: Object, propertyKey: string, _parameterIndex: number) {
    Reflect.defineMetadata(`params:${propertyKey}`, key, target.constructor)
  }
}