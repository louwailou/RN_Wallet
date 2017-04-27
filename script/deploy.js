var _package=require('../package.json');var _package2=_interopRequireDefault(_package);
var _child_process=require('child_process');var _child_process2=_interopRequireDefault(_child_process);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var argv=process.argv.splice(2);

var plat=argv[0];
var isPro=argv[1];
var cmd=undefined;
if(argv.length>2){
cmd=argv[2];
}

var app=_package2.default.name;
var version=_package2.default.version;


function build(platform,isProd){var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;
var inputFile='./index.ios.js';
var outputJSFile='../JiuFuWallet-IOS/JiuFuWallet/Classes/Resource/React/main.jsbundle';
var outputAssetsFile='../JiuFuWallet-IOS/JiuFuWallet/Classes/Resource/React';

if(platform==='android'){
inputFile='./index.android.js';
outputJSFile='';
outputAssetsFile='';
}

var cmd='react-native bundle --entry-file '+inputFile+' --bundle-output '+outputJSFile+' --platform '+platform+' --assets-dest '+outputAssetsFile+'  --dev '+isProd;
_child_process2.default.exec(cmd,_child_process2.default.ExecOptionsWithStringEncoding,function(err,stdout,stderr){
if(stderr){
console.log(stderr);
}else{
console.log(stdout);
if(callback){
callback();
}
}
});
}

function deploy(platform,isProd){
var inputFile='../JiuFuWallet-IOS/JiuFuWallet/Classes/Resource/React';
if(platform==='android'){
inputFile='';
}

var deployment='Staging';
if(isProd==true){
deployment='Production';
}

var cmd='code-push release '+app+'-'+platform+' '+inputFile+' '+version+' -d '+deployment+' --mandatory true';

_child_process2.default.exec(cmd,_child_process2.default.ExecOptionsWithStringEncoding,function(err,stdout,stderr){
if(stderr){
console.log(stderr);
}else{
console.log(stdout);
}
});
}


if(cmd==='-b'){
build(plat,isPro);
}else{
build(plat,true,function(){return deploy(plat,isPro);});
}

module.exports=deploy;
