export function Controller(name: string = "") {
  return function <T extends { new(...args: T[]): {} }>(constructor: T) {
    Reflect.defineMetadata("name", name, constructor);
  }
}