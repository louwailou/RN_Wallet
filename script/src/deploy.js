import pkg from '../package.json';
import child from 'child_process';

const argv = process.argv.splice(2);

const plat = argv[0];
const isPro = argv[1];
const cmd = undefined;
if (argv.length > 2){
    cmd = argv[2];
}

const app = pkg.name;
const version = pkg.version;


function build(platform,isProd,callback=null){
    let inputFile = './index.ios.js';
    let outputJSFile = '../JiuFuWallet-IOS/JiuFuWallet/Classes/Resource/React/main.jsbundle';
    let outputAssetsFile = '../JiuFuWallet-IOS/JiuFuWallet/Classes/Resource/React';

    if (platform === 'android'){
        inputFile = './index.android.js';
        outputJSFile = '';
        outputAssetsFile = '';
    }

    const cmd = `react-native bundle --entry-file ${inputFile} --bundle-output ${outputJSFile} --platform ${platform} --assets-dest ${outputAssetsFile}  --dev ${isProd}`;
    child.exec(cmd,child.ExecOptionsWithStringEncoding,(err,stdout,stderr)=>{
        if (stderr){
            console.log(stderr)
        }else{
            console.log(stdout);
            if (callback){
                callback();
            }
        }
    });
}

function deploy(platform,isProd){
    let inputFile = '../JiuFuWallet-IOS/JiuFuWallet/Classes/Resource/React';
    if (platform === 'android'){
        inputFile = ''; 
    }

    let deployment = 'Staging';
    if (isProd == true){
        deployment = 'Production'
    }

    const cmd = `code-push release ${app}-${platform} ${inputFile} ${version} -d ${deployment} --mandatory true`;

    child.exec(cmd,child.ExecOptionsWithStringEncoding,(err,stdout,stderr)=>{
        if (stderr){
            console.log(stderr)
        }else{
            console.log(stdout);
        }
    });
}


if (cmd === '-b'){
    build(plat, isPro)
}else{
    build(plat, true, ()=>deploy(plat,isPro));
}

module.exports = deploy;




