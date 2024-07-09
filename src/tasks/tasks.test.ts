import supertest, { Response } from "supertest";

const apiUrl = 'http://localhost:3000'

describe("Task Controller Test", function () {
  let taskDefault = {
    id: 1,
    name: "Task 1",
    startDate: "2024-07-01",
    endDate: null
  }

  describe("[CREATE TASK]", () => {

    it("Should return error name is not empty", (done) => {
      supertest(apiUrl)
        .post("/tasks")
        .send({ startDate: "2024-06-01" })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end(function (err: Error, res: Response) {
          expect(res.status).toEqual(400)
          expect(res.body.messages).toEqual("Name is not empty")
          expect(res.body.exception).toEqual("BAD REQUEST")
          if (err) return done(err);
          return done()
        })
    })

    it("If end date is null and start date invalid format", (done) => {
      supertest(apiUrl)
        .post("/tasks")
        .send({
          name: "Task 2",
          startDate: "2024-06"
        })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end(function (err: Error, res: Response) {
          expect(res.status).toEqual(400)
          expect(res.body.messages).toEqual("start date or end date is invalid")
          expect(res.body.exception).toEqual("BAD REQUEST")
          if (err) return done(err);
          return done()
        })
    })

    describe("If end date not null", () => {
      it("Start date is null", (done) => {
        supertest(apiUrl)
          .post("/tasks")
          .send({
            name: "Task 2",
            startDate: "",
            endDate: "2024-07-02"
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end(function (err: Error, res: Response) {
            expect(res.status).toEqual(400)
            expect(res.body.messages).toEqual("start date or end date is invalid")
            expect(res.body.exception).toEqual("BAD REQUEST")
            if (err) return done(err);
            return done()
          })
      })

      it("Start date is invalid format", (done) => {
        supertest(apiUrl)
          .post("/tasks")
          .send({
            name: "Task 2",
            startDate: "2024-06",
            endDate: "2024-07-02"
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end(function (err: Error, res: Response) {
            expect(res.status).toEqual(400)
            expect(res.body.messages).toEqual("start date or end date is invalid")
            expect(res.body.exception).toEqual("BAD REQUEST")
            if (err) return done(err);
            return done()
          })
      })

      it("End date is invalid format", (done) => {
        supertest(apiUrl)
          .post("/tasks")
          .send({
            name: "Task 2",
            startDate: "2024-06-01",
            endDate: "2024-07"
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end(function (err: Error, res: Response) {
            expect(res.status).toEqual(400)
            expect(res.body.messages).toEqual("start date or end date is invalid")
            expect(res.body.exception).toEqual("BAD REQUEST")
            if (err) return done(err);
            return done()
          })
      })
    })

    // it("Should return successfully", (done) => {
    //   const newTask = {
    //     name: "Task 2",
    //     startDate: "2024-06-01",
    //     endDate: "2024-07-01"
    //   }
    //   supertest(apiUrl)
    //     .post("/tasks")
    //     .send(newTask)
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    //     .end(function (err: Error, res: Response) {
    //       expect(res.status).toEqual(200)
    //       expect(res.body.message).toEqual("SUCCESSFULLY")
    //       expect(res.body.data.id).toBeGreaterThan(0)
    //       expect(res.body.data.name).toEqual(newTask.name)
    //       expect(res.body.data.startDate).toEqual(newTask.startDate)
    //       expect(res.body.data.endDate).toEqual(newTask.endDate)
    //       if (err) return done(err);
    //       return done()
    //     })
    // })
  })

  describe("[GET TASK BY ID]", () => {
    it("Should return error not found tasks", (done) => {
      supertest(apiUrl)
        .get("/tasks/100")
        .end(function (err: Error, res: Response) {
          expect(res.status).toEqual(404)
          expect(res.body.messages).toEqual("Task id is not exist")
          expect(res.body.exception).toEqual("NOT FOUND")
          if (err) return done(err);
          return done()
        })
    })

    it("Should return a task", (done) => {
      supertest(apiUrl)
        .get(`/tasks/${taskDefault.id}`)
        .end(function (err: Error, res: Response) {
          expect(res.status).toEqual(200)
          expect(res.body.message).toEqual("SUCCESSFULLY")
          expect(res.body.data.id).toBeGreaterThan(0)
          expect(res.body.data.name).toEqual(taskDefault.name)
          expect(res.body.data.startDate).toEqual(taskDefault.startDate)
          expect(res.body.data.endDate).toEqual(taskDefault.endDate)
          if (err) return done(err);
          return done()
        })
    })
  })

  describe("[UPDATE TASK]", () => {

    it("Should return error not found task", (done) => {
      supertest(apiUrl)
        .put("/tasks/100")
        .send({ startDate: "2024-06-01" })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end(function (err: Error, res: Response) {
          expect(res.status).toEqual(404)
          expect(res.body.messages).toEqual("Task id is not exist")
          expect(res.body.exception).toEqual("NOT FOUND")
          if (err) return done(err);
          return done()
        })
    })

    it("Should return error name is not empty", (done) => {
      supertest(apiUrl)
        .put("/tasks/2")
        .send({ startDate: "2024-06-01" })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end(function (err: Error, res: Response) {
          expect(res.status).toEqual(400)
          expect(res.body.messages).toEqual("Name is not empty")
          expect(res.body.exception).toEqual("BAD REQUEST")
          if (err) return done(err);
          return done()
        })
    })

    it("If end date is null and start date invalid format", (done) => {
      supertest(apiUrl)
        .put("/tasks/2")
        .send({
          name: "Task 2",
          startDate: "2024-06"
        })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end(function (err: Error, res: Response) {
          expect(res.status).toEqual(400)
          expect(res.body.messages).toEqual("start date or end date is invalid")
          expect(res.body.exception).toEqual("BAD REQUEST")
          if (err) return done(err);
          return done()
        })
    })

    describe("If end date not null", () => {
      it("Start date is null", (done) => {
        supertest(apiUrl)
          .put("/tasks/2")
          .send({
            name: "Task 2",
            startDate: "",
            endDate: "2024-07-02"
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end(function (err: Error, res: Response) {
            expect(res.status).toEqual(400)
            expect(res.body.messages).toEqual("start date or end date is invalid")
            expect(res.body.exception).toEqual("BAD REQUEST")
            if (err) return done(err);
            return done()
          })
      })

      it("Start date is invalid format", (done) => {
        supertest(apiUrl)
          .put("/tasks/2")
          .send({
            name: "Task 2",
            startDate: "2024-06",
            endDate: "2024-07-02"
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end(function (err: Error, res: Response) {
            expect(res.status).toEqual(400)
            expect(res.body.messages).toEqual("start date or end date is invalid")
            expect(res.body.exception).toEqual("BAD REQUEST")
            if (err) return done(err);
            return done()
          })
      })

      it("End date is invalid format", (done) => {
        supertest(apiUrl)
          .put("/tasks/2")
          .send({
            name: "Task 2",
            startDate: "2024-06-01",
            endDate: "2024-07"
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .end(function (err: Error, res: Response) {
            expect(res.status).toEqual(400)
            expect(res.body.messages).toEqual("start date or end date is invalid")
            expect(res.body.exception).toEqual("BAD REQUEST")
            if (err) return done(err);
            return done()
          })
      })
    })

    it("Should return successfully", (done) => {
      const newTask = {
        name: "Task 2",
        startDate: "2024-06-01",
        endDate: "2024-07-02"
      }
      supertest(apiUrl)
        .put("/tasks/2")
        .send(newTask)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end(function (err: Error, res: Response) {
          expect(res.status).toEqual(200)
          expect(res.body.message).toEqual("SUCCESSFULLY")
          expect(res.body.data.id).toBeGreaterThan(0)
          expect(res.body.data.name).toEqual(newTask.name)
          expect(res.body.data.startDate).toEqual(newTask.startDate)
          expect(res.body.data.endDate).toEqual(newTask.endDate)
          if (err) return done(err);
          return done()
        })
    })
  })

  describe("[GET LIST TASK]", () => {
    it("Should return list task", (done) => {
      supertest(apiUrl)
        .get(`/tasks`)
        .end(function (err: Error, res: Response) {
          expect(res.status).toEqual(200)
          expect(res.body.message).toEqual("SUCCESSFULLY")
          if (err) return done(err);
          return done()
        })
    })
  })
})