/**
 * Created by oBlank on 4/15/16.
 */
'user strict'

import {EventEmitter} from 'events'
//var EventEmitter = require('events').EventEmitter

class Worker {
    static getLatestItemsSortByItemAsc() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([{_id:1}, {_id:2}, {_id:3}]);
            }, 1000);
        });
    }
}


class Watcher extends EventEmitter {
    constructor(name) {
        super()
        this.setMaxListeners(20)
        this.name = name
    }

    start() {
        this._watchCheckIn()
    }

    _watchCheckIn() {
        this.listen('test_event', (payload) => {
            console.log(payload);
        })

        //TODO loop 新建线程并进入Loop ?
        let last_id = null, count = 0;
        setInterval(() => {
            Worker.getLatestItemsSortByItemAsc()
                .then(items => {
                    items.map(item => {
                        this.fire('test_event', item);
                        last_id = item._id;
                    });
                    console.log("\n" + count++);
                })
        }, 1000);

    }

    fire(event, payload) {
        this.emit(event, payload);
    }

    listen(event, func) {
        this.on(event, func);
    }
}

let watcher = new Watcher();
//watcher.listen('income', (payload) => {
//    console.log(payload);
//})
//
//watcher.fire('income', {event:'income', payload:{cid: 123, data:[11, 43, 23]}});

watcher.start();
