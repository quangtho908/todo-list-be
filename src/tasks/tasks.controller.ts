import { Controller, Method, Req } from "../common/decorators";
import { BadRequetsException } from "../common/types";
import { AppDataSource } from "../config/sqlite.config";
import Tasks from "../entities/tasks";
import { setTaskBody } from "./dto";

@Controller("tasks")
class TasksController {

  private tasksRepo = AppDataSource.getRepository(Tasks)

  private _validateSetTaskBody(body: setTaskBody): { isValid: boolean, messages: string } {
    if (!body.name || body.name.length > 80) {
      return { isValid: false, messages: "Name is not empty" };
    }

    const regexDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    if (!body.endDate) {
      const isValid = !body.startDate || regexDate.test(body.startDate);
      return { isValid, messages: !isValid ? "start date is invalid" : "" }
    }

    const isValid = regexDate.test(body.startDate || "") && regexDate.test(body.endDate);
    return { isValid, messages: !isValid ? "start date or endate is invalid" : "" }
  }

  @Method("get", ":id")
  public async get(@Req("params") { id }: { id: number }) {
    const task = await this.tasksRepo.findOneBy({ id });
    if (!task) {
      throw new BadRequetsException("Task id is not exist")
    }
    return task;
  }

  @Method("post")
  public async create(@Req("body") body: setTaskBody) {
    const { isValid, messages } = this._validateSetTaskBody(body);
    if (!isValid) {
      throw new BadRequetsException(messages)
    }
    const newTask = this.tasksRepo.create(body);
    await this.tasksRepo.save(newTask);
    return newTask;
  }

  @Method("put", ":id")
  public async put(@Req() { body, params }: { body: setTaskBody, params: { id: number } }) {
    const taskExist = await this.tasksRepo.findOneBy(params);
    if (!taskExist) {
      throw new BadRequetsException("Task id is not exist")
    }
    const { isValid, messages } = this._validateSetTaskBody(body);
    if (!isValid) {
      throw new BadRequetsException(messages)
    }

    taskExist.name = body.name;
    taskExist.startDate = body.startDate || taskExist.startDate;
    taskExist.endDate = body.endDate || taskExist.endDate;

    const updatedTask = await this.tasksRepo.save(taskExist);
    return updatedTask;

  }
}

export default TasksController;