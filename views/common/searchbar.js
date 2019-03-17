import React, { Component } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
export default class SearchBar extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} {...this.props} />
                </View>
                <TouchableOpacity style={styles.btn} {...this.props}>
                    <Icon name="search" color="#fff"/>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        height:40,
        marginTop:10,
        marginBottom:-15
    },
    inputContainer:{
        flex:1,
        marginLeft:5
    },
    input:{
        flex:1,
        height:40,
        borderWidth:1,
        borderRadius:4,
        borderColor:"#ccc",
        paddingLeft:5,
        lineHeight:40
    },
    btn:{
        width:55,
        height:40,
        marginLeft:1,
        marginRight:5,
        borderRadius: 4,
        backgroundColor:"#00b600",
        justifyContent:"center",
        alignItems:"center"
    },
    search:{
        flex:1,
        color:"#fff",
        fontSize:12,
        fontWeight:"bold",
        textAlign:"center",
        lineHeight:40
    }
})