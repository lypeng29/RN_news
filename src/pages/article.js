import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SearchBar from './components/searchbar';
import Util from '../common/util';
import Urls from '../common/urls';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            show: true,
            keyword: ''
        };
    }
    componentDidMount() {
        // 初次请求数据
        this.getData();
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

    getData() {
        // 显示loading
        this.setState({
            show: false
        });
        // 请求数据
        var that = this;
        var cateid = this.props.navigation.getParam('cid','');
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
                <SearchBar
                    placeholder="请输入关键词..."
                    onChangeText={this.updateSearch}
                    onSubmitEditing={this.searchText}
                    onPress={this.searchText}
                />
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