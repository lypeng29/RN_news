import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet,TouchableOpacity } from 'react-native';

import Util from './common/util';
import Api from './common/api';
import { TextInput } from 'react-native-gesture-handler';
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: true
        };
    }
    render() {
        return (
            <ScrollView>
                <View>
                    <Text>联系方式</Text>
                    <TextInput style={{ backgroundColor: '#ddd', padding: 5 }} placeholder='输入电话或邮箱' />
                </View>                
                <View>
                    <Text>联系方式</Text>
                    <TextInput style={{backgroundColor:'#ddd',padding:5}} placeholder='输入电话或邮箱'/>
                </View>
            </ScrollView>
        )
    }   
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding:10,
        marginTop: 0
    },
    btn:{
        width:100,
        height:30
    },
    images: { width: 80, height: 100 },
    title:{
        fontWeight:"bold",
        color:"#f33"
    },
    rightbox:{
        flex:1,
        marginLeft:10
    },
    list:{
        flex: 1,
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingTop:10,
        paddingBottom:10
    }
})