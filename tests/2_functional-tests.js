const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });

    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/hello?name=xy_z")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });

    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/travellers")
        .send({ surname: "Colombo" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Cristoforo");
          assert.equal(res.body.surname, "Colombo");
          done();
        });
    });

    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put("/travellers")
        .send({ surname: "da Verrazzano" })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(res.body.name, "Giovanni");
          assert.equal(res.body.surname, "da Verrazzano");
          done();
        });
    });
  });
});

// ========== NOVA SUITE PARA ZOMBIE.JS ==========
const Browser = require('zombie');
const browser = new Browser();

suite('"Famous Italian Explorers" form', function () {
  
  // Setup: visitar a página antes de cada teste
  setup(function(done) {
    browser.visit('http://localhost:3000/', done);
  });

  // #5
  test('Submit the surname "Colombo" in the HTML form', function (done) {
    browser
      .fill('surname', 'Colombo')
      .pressButton('submit', function() {
        // Pequeno delay para a resposta AJAX
        setTimeout(function() {
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.elements('span#dates', 1);
          done();
        }, 500);
      });
  });

  // #6
  test('Submit the surname "Vespucci" in the HTML form', function (done) {
    browser
      .fill('surname', 'Vespucci')
      .pressButton('submit', function() {
        // Pequeno delay para a resposta AJAX
        setTimeout(function() {
          browser.assert.success();
          browser.assert.text('span#name', 'Amerigo');
          browser.assert.text('span#surname', 'Vespucci');
          browser.assert.elements('span#dates', 1);
          done();
        }, 500);
      });
  });
});