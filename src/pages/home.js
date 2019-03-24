import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity,StatusBar } from 'react-native';
import SearchBar from './components/searchbar';
import Util from '../common/util';
import Urls from '../common/urls';

// import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import TabBar from './components/tabbar';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: true,
            keyword: '',
            tablist: []
        };
    }
    componentDidMount() {
        // 初次请求数据
        this.getCategory();
        // 
    }
    updateSearch = search => {
        this.setState({ keyword: search });
    }
    searchText = () => {
        this.getData();
    }
    // 以下写法报错，不识别this
    // searchText (){
    //     this.getData();
    // }

    getCategory(){
        var url = Urls.category_list;
        var that = this;
        var datalist=[];
        Util.getRequest(url,function(response){
            datalist[0] = { 'id': 0, 'name': '全部' };
            response.data.map((item,index)=>{
                datalist[index+1] = {'id':item.id,'name':item.name};
            })
            that.setState({
                tablist: datalist
            })
            that.getData();
        },function(err){
            alert(err);
        })
    }
    getData(cid='') {
        // 显示loading
        this.setState({
            show: false
        });
        // 请求数据
        var that = this;
        var cateid = this.props.navigation.getParam('cid',cid);
        var url = Urls.article_list + '?keyword=' + this.state.keyword + '&cid=' + cateid;
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
        let full_width = Util.windowSize.width;
        let image_width = full_width - 20;
        return (
            <ScrollView>
            <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    networkActivityIndicatorVisible ={false}//仅作用于ios。是否显示正在使用网络。
                    showHideTransition={'fade'}//仅作用于ios。显示或隐藏状态栏时所使用的动画效果（’fade’, ‘slide’）。
                    backgroundColor={'#00b600'} //状态栏的背景色
                    translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
                >
                </StatusBar>
                <SearchBar
                    placeholder="请输入关键词..."
                    onChangeText={this.updateSearch}
                    onSubmitEditing={this.searchText}
                    onPress={this.searchText}
                />
                <TabBar style={{marginTop:10}} ref={e => this.tabs = e} index={this.state.index} data={this.state.tablist}
                    onChange={(index) => { id = this.state.tablist[index].id;this.getData(id); }} />

                {
                    // 请求数据时显示loading，请求成功显示列表
                    this.state.show ?
                        <View style={styles.container} >
                            {
                                this.state.data.map((item, i) => {
                                    return (
                                        <TouchableOpacity style={styles.list} key={i} onPress={() => this.props.navigation.push('Details', { 'id': item.id })}
                                            activeOpacity={0.5}>
                                            <Image source={{ uri: item.thumb }} style={{ width: image_width, height: 160, marginBottom: 10 }} />
                                            <Text style={styles.title}>{item.title}</Text>
                                            <Text style={styles.intro} numberOfLines={4}>{item.intro}</Text>
                                            <Text style={styles.author}>by {item.author} {item.addtime}</Text>
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

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        marginTop: 0
    },
    list: {
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1,
        paddingTop: 0,
        paddingBottom: 15,
        marginBottom:15
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