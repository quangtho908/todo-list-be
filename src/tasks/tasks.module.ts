import { Request, Response, Router } from "express";
import TasksController from "./tasks.controller";
import { BaseException, RouteType } from "../common/types";

export class TasksModule {
  constructor(
    private router: Router = Router(),
    private controller: TasksController = new TasksController()
  ) {
    this._initRoute();
  }

  private _initRoute() {
    const name = Reflect.getMetadata("name", TasksController);
    const routes: RouteType[] = Reflect.getMetadata("routes", TasksController);

    routes.forEach((route: RouteType) => {

      console.log(`[CONTROLLER] Method: ${route.method}, Path: ${name}/${route.path}`)
      this.router[route.method](`/${name}/${route.path}`, async (req: Request, res: Response) => {
        const param: keyof Request = Reflect.getMetadata(`params:${route.methodName}`, TasksController)
        const dataParam = param ? req[param] : req
        try {
          const data = await this.controller[route.methodName as keyof TasksController](dataParam)
          res.json({
            status: 200,
            message: "SUCCESSFULLY",
            data
          })
        } catch (exeption) {
          res.json(exeption)
        }

      })
    });
  }

  public getRouter() {
    return this.router;
  }
}