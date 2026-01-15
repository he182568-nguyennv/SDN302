const { generateId } = require("../utils/toysUtils");

class Toys {
  constructor(name, age, tags = []) {
    this.id = generateId();
    this.name = name;
    this.age = age;
    this.tags = tags;
  }
  toString() {
    return `(ID: ${this.id})-Name:${this.name}-Age:${this.age}-Tags:[${this.tags}]`;
  }
  set addName(newName) {
    this.age = newName;
  }
  set addAge(newName) {
    this.age = newName;
  }
  set addTags(newName) {
    this.age = newName;
  }
}
module.exports = Toys;
