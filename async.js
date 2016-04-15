/**
 * Created by oBlank on 4/1/16.
 */
/**
 * 同步使用Promise.all, 如果将 23, 24 line 置于 25 之后则有可能会出问题
 * resolve
 *
 * @param ms
 * @returns {Promise}
 */

class Test {


    connectDB(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                //console.log(`01: ${ms}`);
                resolve(`success ${ms}`);
            }, ms);
            console.log(`02: ${ms}`);
        });
    }

    async getDatas(value, ms) {
        let t1 = this.connectDB(50);
        let t2 = this.connectDB(20);

        await t1.then((value) => {
            console.log('step 1');
            console.log(value);
        });
        await t2.then((value) => {
            console.log('step 2');
            console.log(value);
        });

        var ret = await Promise.all([this.connectDB(22), this.connectDB(23)]).then((values) => {
            console.log(values);
        });

        console.log(`ret: ${value}`);

        return values;
    }

}

let test = new Test();
test.getDatas('hello world', 50).then(ret => {
    console.log(ret);
});
console.log('line 41')

//
///**
// * 如果没有初始值 0 , 整个流程会少执行一步, 此时第一个无素会被视为初始值.
// */
//var ret = [0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, currentIndex, array) {
//    console.log(`${previousValue}, ${currentValue}, ${currentIndex}, [${array}], \n`);
//    return previousValue + currentValue;
//}, 0);
//
//console.log(ret);