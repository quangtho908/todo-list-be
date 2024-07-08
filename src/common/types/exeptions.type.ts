export interface BaseException {
  exception: string,
  messages: string,
  status: number
}

export class BadRequetsException extends Error implements BaseException {
  public exception: string = "BAD REQUEST"
  public status: number = 400

  constructor(public messages: string = "") {
    super(messages);
  }
}