import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import Util from '../common/util';
import Urls from '../common/urls';
import HTMLView from 'react-native-htmlview';
export default class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: null
        };
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        // var url = Urls.book_detail_id + this.state.bookID;
        var url = Urls.article_view + '?id='+ this.props.navigation.getParam('id', 491);
        var that = this;
        Util.getRequest(url,function(response){
            that.setState({
                bookData: response.data
            })
        },function(error){
            alert(error);
        })
    }
    render(){
        var bookData = this.state.bookData;
        var htmlContent = '<p>你们好<hr/><br/>xiexie!</p>';
        return (
            <ScrollView style={styles.container}>
                {
                    bookData != null ?
                    <View>
                            <Text style={styles.title}>{bookData.title}</Text>
                            <View style={styles.meta}>
                                <Text>{bookData.author}</Text>
                                <Text style={styles.time}>{bookData.addtime}</Text>
                            </View>
                            <HTMLView
                                value={htmlContent}
                                stylesheet={styles.content}
                            />
                    </View>
                    : Util.loading

                }
            </ScrollView>
        )
    }

}
var styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 0
    },
    title: {
        fontWeight: "500",
        fontSize:24,
        lineHeight:32,
        marginTop:30,
        marginBottom:5,
        color:'#333'
    },
    meta:{
        fontSize:14,
        lineHeight:26,
        marginBottom:20,
        color:'#555',
        flex:1,
        flexDirection:'row'
    },
    time:{
        color:'#ccc',
        marginLeft:10
    },
    content:{
        fontSize:18,
        lineHeight:30,
        color:'#555'
    }
})