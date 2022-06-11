const { Recipe, Type, conn } = require("../../src/db");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("title", () => {
      it("should throw an error if title is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should work when its a valid title", () => {
        Recipe.create({ title: "panqueques" });
      });
    });
  });

  // Testing:

  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("Summary", () => {
      it("should throw an error if summary is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid summary")))
          .catch(() => done());
      });
      it("should work when its a valid summary", () => {
        Recipe.create({ summary: 3 });
      });
    });
  });


  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("image", () => {
      it("should throw an error if image is null", (done) => {
        Recipe.create({})
          .then(() => done(new Error("It requires a valid link image")))
          .catch(() => done());
      });
      it("should work when its a valid link image", () => {
        Recipe.create({
          image:
            "https://t1.uc.ltmcdn.com/es/posts/6/4/5/como_hacer_panqueques_sin_huevo_32546_600_square.jpg",
        });
      });
    });
  });
});

describe("Type model", function () {
  beforeEach(async function () {
    await Type.sync({ force: true });
  });
  it("Should not be created without all required fields completed", function (done) {
    Type.create({
      id: "1",
    })
      .then(() => done("Should not have been created, dude!"))
      .catch(() => done());
  });
  it("Name should be a string", function () {
    expect(typeof Type.name).equal("string");
  });
});
