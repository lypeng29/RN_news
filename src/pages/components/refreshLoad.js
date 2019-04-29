import React from 'react'
import { Dimensions, FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native'

// get请求
var util = {
    getRequest: function (url, successcallback, failcallback) {
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    alert('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                }
            })
            .then((responseData) => successcallback(responseData))
            .catch((error) => failcallback(error))
    }
}
// 屏幕尺寸
var screenInfo = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
};
export default class FlatListPage extends React.Component {
    constructor(props) {
        super(props)        
        this.state = {
            refresh: false,
            listData: [],
            animating: true,
            nomore: 1,
            page:1
        }
    }
    getNewData() {
        this.setState({
            refresh: true
        })
        let newData = []
        for (let i = 0; i < 2; i++) {
            newData.push({'title':'new data'})
        }
        setTimeout(() => {
            this.setState({
                refresh: false,
                listData: [...newData, ...this.state.listData]
            })
        }, 1500)
    }
    componentDidMount() {
        // this.onEndReachedCalled = false;
        this.getData()
    }
    getData() {
        let newData = [];
        if(this.state.nomore == 1){
            // 发起请求
            var that = this;

            util.getRequest('https://www.dpshop.net/article/index?cid=12&page=' + this.state.page,function(res){
                res.data.map((item, i) => {
                    newData.push(item);
                });
                that.setState({
                    listData: [...that.state.listData, ...newData],
                    nomore: res.pagination.more,
                    page: that.state.page +1
                }) 
            },function(res){
                alert(res);
            })
        }
    }
    ListFooterComponent = () => {
        return (
            <View style={styles.bottomfoot}>
                {
                    this.state.listData.length != 0 ?
                        this.state.nomore==0 ? (
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
        return (
            <Text style={styles.item}>{item.title}</Text>
        )
        
    };
    render() {      
        return (
            <View>
                <FlatList
                    // 渲染的数据源
                    data={this.state.listData}

                    renderItem={({ item }) => this._renderItem(item)}
                    // renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}

                    // 下拉刷新数据
                    refreshing={this.state.refresh}
                    onRefresh={() => {
                        this.getNewData()
                    }}

                    // 上拉加载更多数据
                    onEndReachedThreshold={.2}
                    onEndReached={() => {
                        this.getData()
                    }}

                    // ListEmptyComponent={<Text style={{ textAlign: "center", marginBottom: 10 }}>暂无数据</Text>}
                    // ListEmptyComponent={this.ListEmptyComponent.bind(this)}

                    // ListFooterComponent={<Text style={{ textAlign: "center", marginBottom: 10 }}>获取更多数据</Text>}
                    ListFooterComponent={this.ListFooterComponent.bind(this)}

                    // ItemSeparatorComponent={ItemSeparatorComponent}

                    // 列表key值,必须是字符串
                    keyExtractor={(item, index) => index.toString()}
                    //设置下拉加载更多的指示器的位置
                    // progressViewOffset={50} 
                    />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: "#e8e8e8",
        marginBottom: 10,
        height: 150,
        lineHeight: 150,
        textAlign: "center",
        color:'#000',
        fontSize:16
    },
    baseLine: {
        width: screenInfo.width,
        height: 1,
        backgroundColor: '#eeeeee',
    },
    noListView: {
        width: screenInfo.width,
        height: screenInfo.height - 140,
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