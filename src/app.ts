import express, { Application as ExpressApp, Router } from "express";
import { DataSource } from "typeorm";
import { TasksModule } from "./tasks/tasks.module";

export default class Application {
  private taskRoute: Router = new TasksModule().getRouter();
  constructor(private appExpress: ExpressApp = express()) {
    appExpress.use(express.json())
    appExpress.use(express.urlencoded({ extended: true }))

    this._initRouter()
  }

  private _initRouter() {
    this.appExpress.use(this.taskRoute)
  }

  public initDataSource(dataSource: DataSource) {
    dataSource.initialize()
      .then(() => {console.log("[TYPEORM] SQLITE3 CONNECTED")})
      .catch(error => console.log(error));
    return this;
  }

  public build() {
    this.appExpress.listen(3000, () => console.log("[SUCCESSFULLY] YOUR APPLICATION ALREADY RUNNING IN http://localhost:3000"))
  }
}