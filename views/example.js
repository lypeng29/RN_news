import React, { Component } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
export default class FlexDirectionBasics extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#00b600',
            height: 45
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1, textAlign: 'center', fontWeight: '400'
        },
        title: 'shiliddddd',
        headerTitle: 'shili',
        headerLeft: '',
        headerRight: '',
    };  
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <View style={styles.box}>
                    <View style={styles.list} />
                    <View style={styles.list} />
                    <View style={styles.list} />
                    <View style={styles.list} />
                    <View style={styles.list} />
                </View>                                 
            </ScrollView>
        );
    }
};
let screenWidth = Dimensions.get("window").width;
let space = 10;
let numbers = 3;
let list_width = screenWidth/numbers - space*2;

var styles = StyleSheet.create({
    box: {
        flex: 1,
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start'
    },
    list: {
        width: list_width,
        height: list_width,
        backgroundColor: 'skyblue',
        borderColor:'#f00',
        borderWidth:1,
        marginTop: 10,
        marginLeft:space,
        marginRight:space
    },
})