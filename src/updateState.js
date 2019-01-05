const fs = require('fs');
var loadedState = require('./loadState');



function writeId(){
    loadedState.storeConf.Store.id = 'QmUUkhH4Grt94jB8bnYgPq41aBHrzRTJFnsuXYvwbpQzL8'
    fs.writeFile(loadedState.storeFile, JSON.stringify(loadedState.storeConf, null, 2), function (err) {
        if (err) return console.log(err);
        console.log('writing to ' + loadedState.storeFile);
    });
}

//writeId();

console.log(Object.keys(loadedState.storeConf.Items).length);