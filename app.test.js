const request = require("supertest");
const app = require("./server/app");

describe("GET /pledges/:id", function() {
  it("respond with pledge data for specified project", function(done) {
    request(app)
      .get("/pledges/1")
      .expect(200, done);
  });
});
