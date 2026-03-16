const chai = require("chai");
const assert = chai.assert;

suite("Unit Tests", function () {
  suite("Basic Assertions", function () {
    // #1
    test("#isNull, #isNotNull", function () {
      assert.isNull(null, "null is null");
      assert.isNotNull(1, "1 is not null");
    });

    // #2
    test("#isDefined, #isUndefined", function () {
      assert.isDefined(null, "null is defined");
      assert.isUndefined(undefined, "undefined is undefined");
      assert.isDefined("hello", "string is defined");
    });

    // #3
    test("#isOk, #isNotOk", function () {
      assert.isNotOk(null, "null is falsy");
      assert.isOk("I'm truthy", "string is truthy");
      assert.isOk(true, "true is truthy");
    });

    // #4
    test("#isTrue, #isNotTrue", function () {
      assert.isTrue(true, "true is true"); // 1ª: true → isTrue ✅
      assert.isNotTrue("true", "string is not true"); // 2ª: 'true' → isNotTrue ✅
      assert.isNotTrue(1, "number is not true"); // 3ª: 1 → isNotTrue ✅
    });
  });

  // ---------------------------------------------------------

  suite("Equality", function () {
    // #5
    test("#equal, #notEqual", function () {
      assert.equal(12, "12", "numbers are coerced into strings with ==");
      assert.notEqual(3, 4, "these numbers are not equal");
    });

    // #6
    test("#strictEqual, #notStrictEqual", function () {
      assert.strictEqual(7, 7, "these numbers are strictly equal");
      assert.notStrictEqual(7, "7", "number and string are not strictly equal");
    });

    // #7
    test("#deepEqual, #notDeepEqual", function () {
      assert.deepEqual(
        { a: "1", b: 5 },
        { b: 5, a: "1" },
        "order of keys doesn't matter",
      );

      assert.notDeepEqual({ a: [5, 6] }, { a: [6, 5] }, "array order matters");
    });
  });

  // ---------------------------------------------------------

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  suite("Comparisons", function () {
    // #8
    test("#isAbove, #isAtMost", function () {
      assert.isAtMost("hello".length, 5);
      assert.isAbove(1, 0);
      assert.isAbove(Math.PI, 3);
      assert.isAtMost(1 - Math.random(), 1);
    });

    // #9
    test("#isBelow, #isAtLeast", function () {
      assert.isAtLeast("world".length, 5);
      assert.isAtLeast(2 * Math.random(), 0);
      assert.isBelow(5 % 2, 2);
      assert.isBelow(2 / 3, 1);
    });

    // #10
    test("#approximately", function () {
      assert.approximately(weirdNumbers(0.5), 1, 0.5);
      assert.approximately(weirdNumbers(0.5), 1, 0.5);
    });
  });

  // ---------------------------------------------------------

  const winterMonths = ["dec,", "jan", "feb", "mar"];
  const backendLanguages = ["php", "python", "javascript", "ruby", "asp"];

  suite("Arrays", function () {
    // #11
    test("#isArray, #isNotArray", function () {
      assert.isArray("isThisAnArray?".split(""));

      assert.isNotArray([1, 2, 3].indexOf(2));
    });

    // #12
    test("Array #include, #notInclude", function () {
      assert.notInclude(winterMonths, "jul");

      assert.include(backendLanguages, "javascript");
    });
  });

  // ---------------------------------------------------------

  const formatPeople = function (name, age) {
    return "# name: " + name + ", age: " + age + "\n";
  };

  suite("Strings", function () {
    // #13
    test("#isString, #isNotString", function () {
      assert.isNotString(Math.sin(Math.PI / 4));

      assert.isString(process.env.PATH);

      assert.isString(JSON.stringify({ type: "object" }));
    });

    // #14
    test("String #include, #notInclude", function () {
      assert.include("Arrow", "row");

      assert.notInclude("dart", "queue");
    });

    // #15
    test("#match, #notMatch", function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;

      assert.match(formatPeople("John Doe", 35), regex);

      assert.notMatch(formatPeople("Paul Smith III", "twenty-four"), regex);
    });
  });

  // ---------------------------------------------------------

  const Car = function () {
    this.model = "sedan";
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = "737";
    this.engines = ["left", "right"];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  suite("Objects", function () {
    // #16
    test("#property, #notProperty", function () {
      assert.notProperty(myCar, "wings");

      assert.property(airlinePlane, "engines");

      assert.property(myCar, "wheels");
    });

    // #17
    test("#typeOf, #notTypeOf", function () {
      assert.typeOf(myCar, "object");
      assert.typeOf(myCar.model, "string");

      assert.notTypeOf(airlinePlane.wings, "string");

      assert.typeOf(airlinePlane.engines, "array");

      assert.typeOf(myCar.wheels, "number");
    });

    // #18
    test("#instanceOf, #notInstanceOf", function () {
      assert.notInstanceOf(myCar, Plane);

      assert.instanceOf(airlinePlane, Plane);

      assert.instanceOf(airlinePlane, Object);

      assert.notInstanceOf(myCar.wheels, String);
    });
  });
});
