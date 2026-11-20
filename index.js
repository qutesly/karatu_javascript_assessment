// PROBLEM 1

// Write deepEqual(objA, objB) that returns true if two objects have the same keys and values recursively (including nested objects), without using JSON.stringify.

function deepEqual(objA, objB) {
  if (objA === objB) return true;

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (!Object.hasOwn(objA, key)) {
      return false;
    }

    if (!deepEqual(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })); // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 })); // false

// PROBLEM 2

// Write diffObjects(oldObj, newObj) that returns an object describing what changed: { added: {...}, removed: {...}, changed: {...} }, comparing only top-level keys.

function diffObjects(oldObj, newObj) {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);

  //  let set = new Set()

  const oldKeysSet = new Set(oldKeys);
  const newKeysSet = new Set(newKeys);

  const result = {
    added: {},
    removed: {},
    changed: {},
  };

  for (const key of newKeys) {
    if (!oldKeysSet.has(key)) {
      result.added[key] = newObj[key];
    }
  }

  for (const key of oldKeys) {
    if (!newKeysSet.has(key)) {
      result.removed[key] = oldObj[key];
    }
  }

  for (const key of oldKeys) {
    if (newKeysSet.has(key) && oldObj[key] !== newObj[key]) {
      result.changed[key] = newObj[key];
    }
  }
  return result;
}

console.log(
  diffObjects(
    { name: "Setemi", role: "Engineer", country: "Jamaica" },
    { name: "Setemi", role: "Senior Engineer", city: "Kingston" },
  ),
);
// { added: { city: 'Kingston' }, removed: { country: 'Jamaica' }, changed: { role: { from: 'Engineer', to: 'Senior Engineer' } } }

//PROBLEM 3

// Object.freeze only freezes the top level. Write deepFreeze(obj) that recursively freezes an object and all of its nested objects, then returns it.

function deepFreeze(obj) {
  const visited = new WeakSet();

  function freeze(value) {
    if (
      value === null ||
      (typeof value !== "object" && typeof value !== "function")
    ) {
      return value;
    }

    if (visited.has(value)) {
      return value;
    }

    visited.add(value);

    for (const key of Object.keys(value)) {
      freeze(value[key]);
    }

    Object.freeze(value);

    return value;
  }

  return freeze(obj);
}

const config = deepFreeze({
  api: { baseUrl: "https://x.com", retries: 3 },
  debug: false,
});
config.api.baseUrl = "https://changed.com"; // should be ignored
config.debug = true; // should be ignored
console.log(config.api.baseUrl, config.debug); // "https://x.com" false
console.log(Object.isFrozen(config.api)); // true

//PROBLEM 4

// Write createCounter() that returns an object with increment(), decrement(), and value as a getter (not a plain property), keeping the internal count truly private via closure.

function createCounter() {
  let count = 0;

  return {
    increment: function () {
      count += 1;

      return count;
    },
    decrement: function () {
      count -= 1;
      return count;
    },
    get value() {
      return count
    }
  };
}
const counter = createCounter();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value); // 1
console.log(counter.count); // undefined — not directly accessible


// PROBLEM 5

// Write validateSchema(obj, schema) where schema maps each key to an expected typeof string (e.g. { name: 'string', age: 'number' }). Return an array of error messages for missing keys or type mismatches; return an empty array if valid.

function validateSchema(obj, schema) {
  /*
   *
   *
   *
   *
   *
   *
   */
}
const schema = { name: 'string', age: 'number', isAdmin: 'boolean' }
console.log(validateSchema({ name: 'Ada', age: 21, isAdmin: false }, schema))
// []
console.log(validateSchema({ name: 'Ada', age: '21' }, schema))
// ['age: expected number, got string', 'isAdmin: missing property']