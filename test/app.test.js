const supertest = require("supertest");
const app = require("../app");
const { expect } = require("chai");
const apps = require("../playstore.js");

describe("GET /apps", () => {
  //write test for: is there a playstore file
  it("should not be an empty file", () => {
    expect(apps).to.not.equal(null);
    // get('/apps')
  });
  //write test for: was a valid genre entered
  it("responds with json when genre is entered", () => {
    supertest(app).get("/apps").query({ genre: "" }).expect(200);
  });
  //test for when genre is wrong
  //write test for: was a valid sort term entered
  it("responds with json when sort tem is entered", () => {
    supertest(app).get("/apps").query({ sort: "" }).expect(200);
  });
  //when sort the sort term is wrong
});
