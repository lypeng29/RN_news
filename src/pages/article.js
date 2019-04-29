import React, { Component } from 'react';
import { Text, View, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import SearchBar from './components/searchbar';
import Util from '../common/util';
import Urls from '../common/urls';

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.onEndReachedCalled = false;
        this.getData();
    }
    getNewData() {
        this.setState({
            refresh: true
        })
        let newData = []
        // for (let i = 1; i < 3; i++) {
        //     var id = i.toString();
        //     newData.push(
        //         {
        //             'id': id, 'cid': 1, 'title': '演示数据', 'addtime': "2019年04月29日",
        //             'thumb':'http://news.dpshop.net/public/static/images/nopic.jpg',
        //             'author':'admin','intro': '这是演示数据'
        //         }
        //     )
        // }
        setTimeout(() => {
            alert('没有新数据');
            this.setState({
                refresh: false,
                // listData: [...newData, ...this.state.listData]
            })
        }, 1500)
    }
    getData() {
        if(this.state.isload == 0){
            this.setState({
                isload : 1
            })
            let newData = [];
            if (this.state.loadMore == 1) {
                // 发起请求
                var that = this;
                var cateid = this.props.navigation.getParam('cid', '');
                var url = Urls.article_list + '?page=' + this.state.page + '&cid=' + cateid;
                // alert(url);
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
    render() {
        return (
            <View style={styles.container}>
            <FlatList
                // 渲染的数据源
                data={this.state.listData}
                
                renderItem={({ item }) => this._renderItem(item)}
                
                // 下拉刷新数据
                refreshing={this.state.refresh}
                onRefresh={() => {
                    this.getNewData()
                }}
                
                // 上拉加载更多数据
                onEndReachedThreshold={0.2}
                onEndReached={() => {
                    this.getData()
                }}
                
                // ListEmptyComponent={<Text style={{ textAlign: "center", marginBottom: 10 }}>暂无数据</Text>}
                
                ListFooterComponent={this.ListFooterComponent.bind(this)}
                
                // 列表key值
                keyExtractor={(item, index) => item.id}
                //设置下拉加载更多的指示器的位置
                progressViewOffset={50} />            
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding:10
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
    }    
})