class MemoryCache {
  #data = {};

  set(key, value) {
    this.#data[key] = value;
    return value;
  }

  get(key) {
    return this.#data[key];
  }
}

module.exports = new MemoryCache();
