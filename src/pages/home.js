import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Util from '../common/util';
import Urls from '../common/urls';
import { Icon } from "react-native-elements";
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { homeModules } from '../common/home.config';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: true
        };
    }
    componentDidMount() {
        // 初次请求数据
        // this.getData();
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
        const modules = homeModules;
        return (
            <View style={{ marginBottom: 10 }}>
                {/* <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    networkActivityIndicatorVisible={false}//仅作用于ios。是否显示正在使用网络。
                    showHideTransition={'fade'}//仅作用于ios。显示或隐藏状态栏时所使用的动画效果（’fade’, ‘slide’）。
                    backgroundColor={'#fff'} //状态栏的背景色
                    translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
                >
                </StatusBar> */}
                <ScrollView>
                    <View style={styles.topbox}>
                        <Text style={styles.toptitle}>美文阅读</Text>
                    </View>  
                    <View style={styles.container} >
                        {
                            modules.map((item, i) => {
                                return (
                                    <TouchableOpacity style={styles.list} key={i} onPress={() => this.props.navigation.push(item.router,item.params)}
                                        activeOpacity={0.5}>
                                        {/* <Image source={{ uri: item.thumb }} style={styles.images} /> */}
                                        <Icon
                                            size={60}
                                            name={item.icon}
                                            type='entypo'
                                            color={item.color}
                                            
                                        />
                                        <Text style={styles.title}>{item.name}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )        
    }
}

let screenWidth = Util.windowSize.width;
let space = 8;
let numbers = 2;
let list_width = screenWidth / numbers - space * 2;

var styles = StyleSheet.create({
    topbox: {
        width: screenWidth,
        height:45,
        backgroundColor:'#fff',
        lineHeight:45,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth:1,
        borderTopColor:'#fafafa',
        borderBottomColor:'#eaeaea',
        borderBottomWidth:1
    },
    toptitle:{
        color: '#f22',
        fontSize: 24,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'
    },
    list: {
        width: list_width,
        // height: list_width+50,
        marginTop: 10,
        padding:10,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',         
    },
    images: {
        width: list_width,
        height: list_width,
        marginBottom: 5
    },
    title: {
        flex:1,
        fontWeight: "500",
        color: "#494949",
        fontSize: 14,
        marginBottom: 6       
    },
})