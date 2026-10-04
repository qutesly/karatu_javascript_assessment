function deepEqual(objA, objB) {
  if (objA === objB) return;

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  const keysA = Object.keys(objA);
  // const keysB = Object.keys(objB)

  // if()

  for (const key of keysA) {
    if (!Object.hasOwn(objA, key)) {
      return false;
    }

    if (!deepEqual(objA[key], objB[key])) {
      // console.log({keysA, keysB})
      return false;
    }
  }

  return true;
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })); // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 })); // false
