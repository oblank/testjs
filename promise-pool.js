/**
 * Created by oBlank on 4/14/16.
 */
// On the Web, leave out this line and use the script tag above instead.
var PromisePool = require('es6-promise-pool')


var delayValue = function (value, time) {
    return new Promise(function (resolve, reject) {
        console.log('Resolving ' + value + ' in ' + time + ' ms')
        setTimeout(function () {
            console.log('Resolving: ' + value)
            resolve(value)
        }, time)
    })
}

var index = 0
var arr = [1, 4, 6, 9, 10];
var promiseProducer = function (value, time) {
    if (index < arr.length) {
        index++;
        return delayValue(arr[index-1], 1000);
    } else {
        return null;
    }
}

// The number of promises to process simultaneously.
var concurrency = 4

// Create a pool.
var pool = new PromisePool(promiseProducer, concurrency)
var ret = 0;
pool.addEventListener('fulfilled', function (event) {
    // The event contains:
    // - target:    the PromisePool itself
    // - data:
    //   - promise: the Promise that got fulfilled
    //   - result:  the result of that Promise.
    ret += event.data.result;
    console.log('Fulfilled: ' + event.data.result)
})


pool.addEventListener('rejected', function (event) {
    // The event contains:
    // - target:    the PromisePool itself
    // - data:
    //   - promise: the Promise that got rejected
    //   - error:   the Error for the rejection.
    console.log('Rejected: ' + event.data.error.message)
})



// Start the pool.
var poolPromise = pool.start()

// Wait for the pool to settle.
poolPromise.then(function () {
    console.log('result total:' + ret);
    console.log('All promises fulfilled');
}, function (error) {
    console.log('Some promise rejected: ' + error.message)
})