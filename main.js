// 4. Data Structures: Objects and Arrays

// - The sum of a range
function range(from, to, step = 1) {
    let sequence = [];
    const condition = { '1': (x, y) => x <= y, '-1': (x, y) => x >= y };
    for (let i = from; condition[Math.sign(step)](i, to); i += step) {
        sequence.push(i);
    }
    return sequence;
}

function sum(sequence) {
    return sequence.reduce((acc, current) => acc + current);
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55


// - Reversing an array
function reverseArray(array) {
    let reversedArray = [];
    for(let i = array.length - 1; i >= 0; i--) {
        reversedArray.push(array[i]);
    }
    return reversedArray;
}

function reverseArrayInPlace(array) {
    for(let i = 0, j = array.length - 1; i < j; i++, j--) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]


// - A list
function arrayToList(array) {
    if (array.length == 0) { return null; }
    const head = { value: array[0], next: null };
    for(let i = 1, previous = head; i < array.length; i++, previous = previous.next) {
        previous.next = { value: array[i], next: null };
    }
    return head;
};

function listToArray(head) {
    let array = [];
    for(let current = head; current != null; current = current.next) {
        array.push(current.value);
    }
    return array;
}

function prepend(value, head) {
    return { value: value, next: head };
}

function nth(head, n) {
    let value = null;
    for(let current = head, i = 0; current != null && i <= n; current = current.next, i++) {
        if (i === n) { value = current.value; }
    }
    return value;
}

function rnth(head, n) {
    function nth(current, i) {
        if (current === null) { return null; }
        else if (i === n) { return current.value; }
        else { return nth(current.next, ++i); }
    }
    return nth(head, 0);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
console.log(rnth(arrayToList([10, 20, 30]), 1));
// → 20


// - Deep comparison
function deepEqual(lhs, rhs) {
    if (typeof lhs === 'object' && typeof rhs === 'object' && lhs !== null && rhs !== null) {
        let lhsKeys = Object.keys(lhs), rhsKeys = Object.keys(rhs);
        if (lhsKeys.length === rhsKeys.length) {
            let result = true;
            for(let i = 0; result && i < lhsKeys.length; i++) {
                result = (lhsKeys[i] === rhsKeys[i]) && deepEqual(lhs[lhsKeys[i]], rhs[rhsKeys[i]]);
            }
            return result;
        }
        return false
    }
    return lhs === rhs;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

// 5. Higher-Order Functions

// - Flattening
function flattened(array) { 
    return array.reduce((acc, next) => acc.concat(next))
}

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flattened(arrays));
// → [1, 2, 3, 4, 5, 6]

// - Your own loop
function loop(init, check, update, body) { 
    for(let i = init; check(i); i = update(i)) { 
        body(i);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

// - Everything
function everyLoop(array, test) {
    for(let element of array) { 
        if (!test(element)) { 
            return false;
        }
    }
    return true;
}

function everySome(array, test) {
    return !array.some((x) => !test(x))
}

console.log(everyLoop([1, 3, 5], n => n < 10));
// → true
console.log(everyLoop([2, 4, 16], n => n < 10));
// → false
console.log(everyLoop([], n => n < 10));
// → true
console.log(everySome([1, 3, 5], n => n < 10));
// → true
console.log(everySome([2, 4, 16], n => n < 10));
// → false
console.log(everySome([], n => n < 10));
// → true

// - Dominant writing direction
function dominantDirection(text) {
    const scripts = require("./auxiliary/scripts.js");
    const directionsCount = {};
    for(const char of text) {
        const codePoint = char.codePointAt(0);
        const scriptForCodePoint = scripts.find(x => x.ranges.some(([from, to]) => codePoint >= from && codePoint < to));
        if (scriptForCodePoint) { 
            directionsCount[scriptForCodePoint.direction] = (directionsCount[scriptForCodePoint.direction] || 0) + 1;
        }
    }
    return Object.keys(directionsCount).reduce((result, key) => directionsCount[key] > directionsCount[result] ? key : result);
} 

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl

