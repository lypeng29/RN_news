import React, { Component } from 'react';
import { Text, View,TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
export default class SearchBar extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Icon name="search" color="#555" size={16} containerStyle={styles.icon} {...this.props}/>
                    <TextInput style={styles.input} {...this.props} />
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        marginTop:10
    },
    inputContainer:{
        flex:1,
        flexDirection: "row",
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#ddd",
        backgroundColor:'#f8f8f8',
        marginLeft:10,
        marginRight:10,
        height: 40,
        lineHeight: 40
    },
    input:{
        flex:9,
        fontSize:14
    },
    icon:{
        flex: 1
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