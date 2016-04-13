/**
 * Created by oBlank on 4/7/16.
 */

let object = {
    user_id: 23345,
    aget: 30,
    name: 'oBlank'
}

console.log(Object.keys(object).length)

for (let key in object) {
    console.log(key);
    console.log(object[key]);
    console.log('--------');
}