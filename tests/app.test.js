const request = require("supertest");
const app = require("../server/app");

describe("Testing Pledge service server", () => {
  test("It should respond with pledge data for GET request", () => {
    return request(app)
      .get("/pledges/108")
      .expect("Content-Type", /json/)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined;
        expect(response.body.id).toEqual(108);
        expect(response.body.goal).toEqual(10000);
        expect(response.body.pledged).toBeGreaterThanOrEqual(1);
        expect(response.body.backer_count).toBeGreaterThanOrEqual(1);
        expect(response.body.days_left).toEqual(42);
      });
  });

  test("It should respond with a 500 code for a GET request with a bad ID", () => {
    return request(app)
      .get("/pledges/500")
      .then(response => {
        expect(response.statusCode).toBe(500);
      });
  });

  test("It should be able to submit post request", () => {
    return request(app)
      .post("/pledges")
      .send({ id: 108, pledge_amount: 1 })
      .set("Accept", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It should respond with a 500 code for bad post request", () => {
    return request(app)
      .post("/pledges")
      .send({ foo: "bar" })
      .set("Accept", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(500);
      });
  });

  test("It should update the database on post request", () => {
    return request(app)
      .get("/pledges/108")
      .then(response => {
        let oldData = response.body;
        return request(app)
          .post("/pledges")
          .send({ id: 108, pledge_amount: 1 })
          .set("Accept", "application/json")
          .then(response => {
            return request(app)
              .get("/pledges/108")
              .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeDefined;
                expect(response.body.id).toEqual(108);
                expect(response.body.goal).toEqual(10000);
                expect(response.body.pledged).toEqual(oldData.pledged + 1);
                expect(response.body.backer_count).toEqual(
                  oldData.backer_count + 1
                );
              });
          });
      });
  });
});
