import React, { Component } from 'react';
import { ScrollView,View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

export default class SettingsPage extends Component {
    _settingAction = () => alert('setting')

    _onPressStaticCell = title => alert(title)    

    render() {       
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <View style={styles.cellContainer}>
                    <ProfileStaticCell
                        title="账号设置"
                        imageName={require('../assets/images/ic_my_photos.png')}
                        onPress={this._onPressStaticCell}
                    />
                    <ProfileStaticCell
                        title="修改头像"
                        imageName={require('../assets/images/ic_my_collect.png')}
                        onPress={this._onPressStaticCell}
                    />
                </View>
                <View style={styles.cellContainer}>
                    <ProfileStaticCell
                        title="是否显示通知"
                        imageName={require('../assets/images/ic_my_photos.png')}
                        onPress={this._onPressStaticCell}
                    />
                    <ProfileStaticCell
                        title="一行N栏"
                        imageName={require('../assets/images/ic_my_collect.png')}
                        onPress={this._onPressStaticCell}
                    />
                    <ProfileStaticCell
                        title="GET与POST请求"
                        imageName={require('../assets/images/ic_my_upload.png')}
                        onPress={this._onPressStaticCell}
                    />
                    <ProfileStaticCell
                        title="插件实验室"
                        imageName={require('../assets/images/ic_my_collect.png')}
                        onPress={this._onPressStaticCell}
                    />
                </View>
                <View style={styles.cellContainer}>
                    <ProfileStaticCell
                        title="关于"
                        imageName={require('../assets/images/ic_my_photos.png')}
                        onPress={this._onPressStaticCell}
                    />                
                    <ProfileStaticCell
                        title="帮助与反馈"
                        imageName={require('../assets/images/ic_my_photos.png')}
                        onPress={()=>this.props.navigation.push('Guestbook')}
                    />
                </View>                                
                <View style={styles.cellContainer}>
                    <ProfileStaticCell
                        title="切换账号"
                        imageName={require('../assets/images/ic_my_collect.png')}
                        onPress={this._onPressStaticCell}
                    />
                    <ProfileStaticCell
                        title="退出登录"
                        imageName={require('../assets/images/ic_my_upload.png')}
                        onPress={this._onPressStaticCell}
                    />
                </View>
            </ScrollView>
        );
    }
};

const ProfileStaticCell = ({
    title,
    imageName,
    style,
    onPress
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={styles.staticCell}
            onPress={() => onPress(title)}
        >
            <Image style={{ width: 20, height: 20, marginHorizontal: 15 }} source={imageName} />
            <View style={[styles.cellStyle, style || style]}>
                <Text style={{ color: 'gray' }}>{title}</Text>
                <Image style={{ width: 20, height: 20 }} source={require('../assets/images/ic_my_right.png')} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cellContainer: {
        borderColor: '#d9d9d9',
        marginTop: 15,
        marginBottom: 5,
        backgroundColor: 'white'
    },
    staticCell: {
        flexDirection: 'row',
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#eaeaea'
    },
    cellStyle: {
        flex: 1,
        height: 46,
        borderColor: '#d9d9d9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15
    }
});