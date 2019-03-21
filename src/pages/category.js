import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Util from '../common/util';
import Urls from '../common/urls';
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: true
        };
    }
    componentDidMount() {
        // 初次请求数据
        this.getData();
    }
    getData() {
        // 显示loading
        this.setState({
            show: false
        });
        // 请求数据
        var that = this;
        var url = Urls.category_list;
        Util.getRequest(url, function (response) {
            // 请求成功
            if (!response.data || response.data.length == 0) {
                return alert("未查询到数据");
            }
            // 显示loading,将请求结果赋值给data
            that.setState({
                show: true,
                data: response.data
            });
        }, function (error) {
            // 请求失败
            alert(error);
        });
    }
    render() {
        return (
            <ScrollView>
                {
                    // 请求数据时显示loading，请求成功显示列表
                    this.state.show ?
                        <View style={styles.container} >
                            {
                                this.state.data.map((item, i) => {
                                    return (
                                        <TouchableOpacity style={styles.list} key={i} onPress={() => this.props.navigation.push('Home', { 'cid': item.id })}
                                            activeOpacity={0.5}>
                                            <Image source={{ uri: item.thumb }} style={styles.images}/>
                                            <Text style={styles.title}>{item.name}</Text>
                                            <Text style={styles.intro} numberOfLines={2}>{item.intro}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                        : Util.loading
                }
            </ScrollView>
        )
    }
}

let screenWidth = Util.windowSize.width;
let space = 10;
let numbers = 2;
let list_width = screenWidth / numbers - space * 2;

var styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'        
    },  
    list: {
        width:list_width,
        // height:list_height,
        marginTop:10,
        flexDirection: 'column'        
    },
    images:{
        width:list_width,
        height:list_width,
        marginBottom:5
    },
    title: {
        fontWeight: "500",
        color: "#494949",
        fontSize: 18,
        marginBottom: 6,
        lineHeight:30
    },
    intro:{
        color:"#999",
        fontSize:12,
        lineHeight: 18,
        marginBottom: 10
    },
    author:{
        fontSize:12,
        color:"#ccc"
    }
})