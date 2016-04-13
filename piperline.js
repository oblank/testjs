/**
 * Created by oBlank on 4/13/16.
 */

var Piperline = require('piperline');

//normal
Piperline.create()
    .pipe(function(data, next, done) {
        console.log("step 1 \n");
        console.log(next);
        next('foo');
    })
    .pipe(function(data, next, done) {
        console.log("step 2 \n");
        console.log(next);
        next(data + ' bar');
    })
    .on('error', function(err) {
        console.error(err);
    })
    .on('done', function(result) {
        console.log(result); // foo bar
    })
    .run();

//callback
var pipeline = require('piperline').create();
pipeline
    .pipe(function(data, next, done) {
        next(data + 1);
    })
    .pipe(function(data, next, done) {
        next(data + 2);
    })
    .on('error', function(err) {
        console.error(err);
    })
    .on('done', function(result) {
        console.log(result); // 3
    })
    .run(4, function(err, data) {
        if (err) {
            // do stuff
        }
        console.log('done');
    });


//Pipeline interruption
var Piperline = require('piperline');
Piperline.create()
    .pipe(function(data, next, done) {
        next(data + 1);
    })
    .pipe(function(data, next, done) {
        if (data === 1) {
            done(data);
        }
        next(data + 2);
    })
    .pipe(function(data, next, done) {
        next(data + 3);
    })
    .on('error', function(err) {
        console.error(err);
    })
    .on('done', function(result) {
        console.log(result); // 1
    })
    .run(0);



//Re-usage
var pipeline = require('piperline').create();
pipeline
    .pipe(function(data, next, done) {
        console.log("\n\nRE-USAGE:");
        next(data + 1);
    })
    .pipe(function(data, next, done) {
        next(data + 2);
    })
    .on('done', function(result) {
        console.log(result); // 1
    })
    .on('finish', () => {
        // everything is completed
        console.log('done-finish');
    });

[1, 2, 3, 4].forEach(data => pipeline.run(data));