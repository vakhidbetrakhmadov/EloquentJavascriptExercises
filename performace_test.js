// - Auxiliary functions
function range(from, to, step = 1) {
    const sequence = [];
    const condition = { '1': (x, y) => x <= y, '-1': (x, y) => x >= y };
    for (let i = from; condition[Math.sign(step)](i, to); i += step) {
        sequence.push(i);
    }
    return sequence;
}

function timeInMilliseconds(func) { 
    const NS_PER_MS = 1000000;
    const MS_PER_SEC = 1000;
    const start = process.hrtime();
    func();
    const timeElapsed = process.hrtime(start); // [seconds, nanoseconds] 
    return timeElapsed[0] * MS_PER_SEC + timeElapsed[1] / NS_PER_MS;
}

function averageTimeInMilliseconds(func, reps) { 
    let totalTime = 0;
    for(let i = 0; i < reps; i++) { 
        totalTime += timeInMilliseconds(func);
    }
    return totalTime / reps;    
}

function measureFor(arraySize) { 
    console.log(`When array size is %d:`, arraySize);
    const array = range(1, arraySize);
    console.log("forLoopSum:\t", averageTimeInMilliseconds(() => forLoopSum(array), 1000), "ms");
    console.log("forEachLoopSum:\t", averageTimeInMilliseconds(() => forEachLoopSum(array), 1000), "ms");
    console.log("reduceSum:\t", averageTimeInMilliseconds(() => reduceSum(array), 1000), "ms");
    console.log();
}

function sum(n) { 
    return (n * (n + 1)) / 2;
}

function testImplementations() { 
    console.log("Test implementations:")
    console.log("forLoopSum:\t", forLoopSum(range(1, 10)) === sum(10));
    console.log("forEachLoopSum:\t", forEachLoopSum(range(1, 10)) === sum(10));
    console.log("reduceSum:\t", reduceSum(range(1, 10)) === sum(10));
    console.log()
}

// - Functions to measure performance of
function forLoopSum(array) { 
    let sum = 0;
    for (let i = 0; i < array.length; i++) { 
        sum += array[i];
    }
    return sum;
}

function forEachLoopSum(array) { 
    let sum = 0;
    for (let element of array) { 
        sum += element;
    }
    return sum;
}

function reduceSum(array) { 
    return array.reduce((acc, current) => acc + current);
}

// - Test implementations
testImplementations()

// - Measure performance
measureFor(10);
measureFor(100);
measureFor(1000);
measureFor(100000);
measureFor(10000000);

// -> 
// Test implementations:
// forLoopSum:      true
// forEachLoopSum:  true
// reduceSum:       true

// When array size is 10:
// forLoopSum:      0.001692839 ms
// forEachLoopSum:  0.0017919389999999998 ms
// reduceSum:       0.0005875839999999993 ms

// When array size is 100:
// forLoopSum:      0.00020584900000000255 ms
// forEachLoopSum:  0.0002396409999999985 ms
// reduceSum:       0.0021214529999999997 ms

// When array size is 1000:
// forLoopSum:      0.0010033150000000044 ms
// forEachLoopSum:  0.001302300000000004 ms
// reduceSum:       0.016352403000000005 ms

// When array size is 100000:
// forLoopSum:      0.11005187800000002 ms
// forEachLoopSum:  0.1577995530000001 ms
// reduceSum:       1.7355590570000006 ms

// When array size is 10000000:
// forLoopSum:      12.519520612000015 ms
// forEachLoopSum:  17.254546828999985 ms
// reduceSum:       164.67193732900031 ms