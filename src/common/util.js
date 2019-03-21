/**
 * get
 */
import React, { Component } from 'react';
import {
    Dimensions,//获取设备屏幕的宽高
    ActivityIndicator
} from 'react-native';
import { existsTypeAnnotation } from '@babel/types';

var Util = {
    // 屏幕尺寸
    windowSize: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },

    // get
    getRequest : function(url, successcallback,failcallback){
        fetch(url)
        .then((response)=>{
            if (response.ok) {
                return response.json()
            } else {
                alert('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
            }
        })
        .then((responseData)=>successcallback(responseData))
        .catch((error)=>failcallback(error))
    },

    postRequest: function (url, data,successcallback, failcallback) {
        let formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        var opts = {
            method: 'POST',
            body: formData
        }        
        fetch(url, opts)
            .then((response) => {
                if (response.ok) {
                    return response.text()
                } else {
                    alert('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                }
            })
            .then((responseData) => successcallback(responseData))
            .catch((error) => failcallback(error))
    },
    // loading
    loading : <ActivityIndicator style={{marginTop: 200}} />
}

export default Util;