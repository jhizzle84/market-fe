const fs = require('fs');
const path = require('path');
const os = require( "os" );

const home = os.homedir(); 
const storeFile = home + path.normalize('/Shock/store.json')
const ipfsConfFile = home + path.normalize('/.ipfs/config')

console.log(ipfsConfFile)

var storeConf= JSON.parse(fs.readFileSync(storeFile, 'utf8'));
var ipfsConf = JSON.parse(fs.readFileSync(ipfsConfFile, 'utf8'));

console.log(ipfsConf.Identity.PrivKey);

exports.storeFile = storeFile;
exports.storeConf = storeConf;
exports.ipfsConfFile = ipfsConfFile;
exports.ipfsConf = ipfsConf;


