import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity,StatusBar } from 'react-native';
import SearchBar from './components/searchbar';
import Util from '../common/util';
import Urls from '../common/urls';

// import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import TabBar from './components/tabbar';
// import MyLoad from "../components/refreshLoad";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            keyword: '',
            tablist: [],
            refresh: false,
            listData: [],
            animating: true,
            loadMore: 1,
            page: 1,
            isload: 0 //避免多次加载
        };
    }
    componentDidMount() {
        // 初次请求数据
        // this.onEndReachedCalled = false;
        this.getCategory();
    }
    updateSearch = search => {
        this.setState({ keyword: search });
    }
    searchText = () => {
        this.getData();
    }
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
    getData() {
        if (this.state.isload == 0) {
            this.setState({
                isload: 1
            })
            let newData = [];
            if (this.state.loadMore == 1) {
                // 发起请求
                var that = this;
                var cateid = this.props.navigation.getParam('cid', '');
                var url = Urls.article_list + '?page=' + this.state.page + '&cid=' + cateid;
                alert(url);
                Util.getRequest(url, function (res) {
                    res.data.map((item, i) => {
                        newData.push(item);
                    });
                    that.setState({
                        listData: [...that.state.listData, ...newData],
                        loadMore: res.pagination.more,
                        page: that.state.page + 1,
                        isload: 0
                    })
                }, function (res) {
                    alert(res);
                })
            }
        }
    }
    ListFooterComponent = () => {
        return (
            <View style={styles.bottomfoot}>
                {
                    this.state.listData.length != 0 ?
                        this.state.loadMore == 0 ? (
                            <Text style={styles.footText}>- 我是有底线的 -</Text>
                        ) : (
                                <View style={styles.activeLoad}>
                                    <ActivityIndicator size="small" animating={true} />
                                    <Text style={[styles.footText, styles.ml]}>加载更多...</Text>
                                </View>
                            )
                        :
                        null
                }

            </View>
        );
    }
    _renderItem(item) {
        let full_width = Util.windowSize.width;
        let image_width = full_width - 20;
        return (
            <TouchableOpacity style={styles.list} key={item.id} onPress={() => this.props.navigation.push('Details', { 'id': item.id })}
                activeOpacity={0.5}>
                <Image source={{ uri: item.thumb }} style={{ width: image_width, height: 160, marginBottom: 10 }} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.intro} numberOfLines={4}>{item.intro}</Text>
                <Text style={styles.author}>by {item.author} {item.addtime}</Text>
            </TouchableOpacity>            
            // <Text style={styles.item}>{item.title}</Text>
        )
    }
    ListHeaderComponent(){
        return (
            <View>
            <StatusBar
                animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                hidden={false}  //是否隐藏状态栏。
                networkActivityIndicatorVisible={false}//仅作用于ios。是否显示正在使用网络。
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
                {/* <TabBar style={{marginTop:10}} ref={e => this.tabs = e} index={this.state.index} data={this.state.tablist} */ }
                {/* onChange={(index) => { id = this.state.tablist[index].id;this.getData(id); }} /> */ }
            <TabBar style={{ marginTop: 10 }} ref={e => this.tabs = e} index={this.state.index} data={this.state.tablist}
            onChange={(index) => { id = this.state.tablist[index].id; this.props.navigation.push('Article', { 'cid': id }); }} />
            </View>
        )
    }
    render() {
        return (
            <FlatList
                data={this.state.listData}
                renderItem={({ item }) => this._renderItem(item)}

                // 上拉加载更多数据
                onEndReachedThreshold={.2}
                onEndReached={() => {
                    this.getData()
                }}

                ListHeaderComponent={this.ListHeaderComponent.bind(this)}
                ListFooterComponent={this.ListFooterComponent.bind(this)}

                // key值
                keyExtractor={(item, index) => item.id}

                //设置下拉加载更多的指示器的位置
                // progressViewOffset={50}

            />
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
        marginBottom:15,
        marginLeft:10,
        marginRight:10
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
    },
    item: {
        backgroundColor: "#e8e8e8",
        marginBottom: 10,
        height: 150,
        lineHeight: 150,
        textAlign: "center",
        color: '#000',
        fontSize: 16
    },
    baseLine: {
        width: Util.windowSize.width,
        height: 1,
        backgroundColor: '#eeeeee',
    },
    noListView: {
        width: Util.windowSize.width,
        height: Util.windowSize.height - 140,
        justifyContent: 'center',
        alignItems: 'center',
    },
    NoListText: {
        marginTop: 15,
        fontSize: 18,
        color: '#999999',
    },
    bottomfoot: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    footText: {
        marginTop: 5,
        fontSize: 12,
        color: '#999999',
    },
    activeLoad: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ml: {
        marginLeft: 10,
    },     
})