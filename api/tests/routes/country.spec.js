const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  title: "Panqueques con dulce de leche",
  image:
    "https://t1.uc.ltmcdn.com/es/posts/6/4/5/como_hacer_panqueques_sin_huevo_32546_600_square.jpg",
  id: 1,
  summary: "Cocinar los panqueques",
  spoonacularScore: 99,
  healthScore:56,
  steps:'cocinar a fuego lento'
};

describe("Recipes routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Can't reach DataBase", err);
    })
  );

  describe("/recipes", function () {
    it("GET respons with status 200", function () {
      return agent.get("/recipes").expect(function (res) {
        expect(res.status).equal(200);
      });
    }).timeout(10000);
    it("Elements received are Object type", function () {
      return agent.get("/recipes").expect(function (res) {
        expect(typeof res.body[0]).equal("object");
      });
    }).timeout(10000);
  });

  describe("/recipes?query=", function () {
    it("GET receives a body length larger if there is query coincidences", function () {
      return agent.get("/recipes?query=pasta").expect(function (res) {
        expect(Object.keys(res.body).length).equal(10);
      });
    }).timeout(3000);
  });

  describe("/recipes/:id", function () {
    it("GET responses with status 200 if a pokemon is found", function () {
      return agent.get("/recipes/1").expect(function (res) {
        expect(res.status).equal(200);
      });
    }).timeout(10000);
  });
});