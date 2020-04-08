const supertest = require("supertest");
const app = require("../app");
const { expect } = require("chai");
const apps = require("../playstore.js");

describe("GET /apps", () => {
  //write test for: is there a playstore file
  it("should not be an empty file", () => {
    get('/apps').expect(apps).to.not.equal(null);
    
  });
  //write test for: was a valid genre entered
  it("responds with json when valid genre is entered", () => {
    supertest(app)
      .get("/apps")
      .query(query)
      .expect(200).expect('Content-Type', /json/).then(res => {
          expect(res.body).to.have.any.keys('Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card');
          expect(res.body).to.eql(expected);
      });
  })
  //test for when genre is wrong

  //return an array of apps
it('should return an array of apps', () => {
    return supertest(app).get('/apps').expect(200).expect("Content-Type", /json/).then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys('App', 'Genres', 'Rating')
    });
})
  //write test for: was a valid sort term entered
  it("responds with json when sort tem is entered", () => {
    supertest(app)
      .get("/apps")
      .query({ sort: "" })
      .expect(200)
      .expect("Content-Type", /json/).then(res => {
          expect(res.body).to.be.an('array');
      });
  });
  //when sort the sort term is wrong
  it('should be 400 if sort is incorrect', () => {
      return supertest(app).get('/apps').query({ sort: 'MISTAKE'}).expect(400, 'Sort must be one of rating or app')
  })

  //make sure it is sorted in correct order
  it('should sort by app name', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'App' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare app at `i` with next app at `i + 1`
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          // if the next app is less than the app at i,
          if (appAtIPlus1.title < appAtI.title) {
            // the apps were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});
