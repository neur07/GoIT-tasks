// Zadanie 1
class StringBuilder {
  constructor(baseString = "") {
    this.value = baseString;
  }
  prepend(str) {
    this.value = [str, this.value].join("");
    return this;
  }
  append(str) {
    this.value = [this.value, str].join("");
    return this;
  }
  pad(str) {
    this.value = [str, this.value, str].join("");
    return this;
  }
  toString() {
    return this.value;
  }
  valueOf() {
    return this.toString();
  }
}
