/**
 * Created by jayden on 2016/12/7.
 */

"use strict";

import { NativeModules } from 'react-native';

const fetchService = NativeModules.JFNetFetch;
const host = fetchService.host;

class NetFetch {
    async post(url='', params = {}) {

        let abort_fn = null;
        let abort_promise = new Promise((resolve, reject) => {
            abort_fn =  () => {
                reject({code:55555,msg:'网络请求超时'});
            };
        });
        let reqUrl = url;
        if(!reqUrl.startsWith('http')){
            reqUrl = host + '/' + reqUrl;
        }
        let reqData = await fetchService.commonReqInfo();
        reqData.model = params
        // return fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //         body: 'data=' + JSON.stringify(reqData)
        //     }).then(response => {
        //         if (response.status != 200) {
        //             throw { code: response.status, msg: '网络连接不给力' };
        //         }
        //         let json = response.json();
        //         if (!json) {
        //             throw { code: 55555, msg: '网络连接不给力' };
        //         }
        //         return json;
        //     }).then(json => {
        //         if (json.code != 0) {
        //             throw { code: json.code, msg: json.message };
        //         }
        //         return json.model;

        //     }).catch(error => {
        //         let msg = '网络连接不给力';
        //         // toastService.showDelayInfoTip(msg);
        //         throw { code: 55555, msg: msg };
        //     });

        let abortable_promise = Promise.race([
            fetch(reqUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'data=' + JSON.stringify(reqData)
            }).then(response => {
                if (response.status != 200) {
                    throw { code: response.status, msg: '网络连接不给力' };
                }
                let json = response.json();
                if (!json) {
                    throw { code: 55555, msg: '网络连接不给力' };
                }
                return json;
            }).then(json => {
                if (json.code != 0) {
                    throw { code: json.code, msg: json.message };
                }
                return json.model;

            }).catch(error => {
                let msg = '网络连接不给力';
                // toastService.showDelayInfoTip(msg);
                throw { code: 55555, msg: msg };
            }),
            abort_promise
        ]);

        setTimeout(function () {
            abort_fn();
        }, 15000);

        return abortable_promise;
    }

    // async post(url, params) {
    //     let events = await fetchService.commonReqInfo();
    //     let reqData = events[0];
    //     console.log(reqData);
    //     reqData.model = params ? params : {};
    //     let response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: 'data=' + JSON.stringify(reqData)
    //     });
    //     console.log(response);
    //     if (response.status != 200) {
    //         throw {code: response.status, msg: '网络无法连接'};
    //     }
    //     let json = await response.json();
    //     if (!json) {
    //         throw {code: 55555, msg: '网络无法连接'};
    //     }
    //     if (json.code != 0) {
    //         throw {code: json.code, msg: json.message};
    //     }
    //     return json.model;
    // }

    get(url='', params = {}) {

    }
}

module.exports = new NetFetch();