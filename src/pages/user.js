import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image,ImageBackground,Dimensions, StyleSheet } from 'react-native';
import {Icon} from 'react-native-elements';

export default class UserPage extends Component {
    _settingAction = () => alert('setting')

    _onLogin = () => {
        const { app, navigator } = this.props
        app.updateBarStyle('default')
        navigator.push({
            id: 'Login',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            passProps: { onResetBarStyle: () => app.updateBarStyle('light-content') }
        })
    }

    _onPressStaticCell = title => alert(title)    

    render() {       
        return (
            <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <HeaderView settingAction={this._settingAction} loginAction={this._onLogin} />
                <View style={styles.cellContainer}>
                    <ProfileStaticCell
                        title="我的照片"
                        imageName={require('../assets/images/ic_my_photos.png')}
                        onPress={this._onPressStaticCell}
                    />
                    <ProfileStaticCell
                        title="我的收藏"
                        imageName={require('../assets/images/ic_my_collect.png')}
                        onPress={this._onPressStaticCell}
                    />
                    <ProfileStaticCell
                        title="上传食物数据"
                        imageName={require('../assets/images/ic_my_upload.png')}
                        onPress={this._onPressStaticCell}
                    />
                </View>
            </View>
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

const HeaderView = ({ settingAction, loginAction }) => {
    var gScreen = Dimensions.get("window");
    return (
        <ImageBackground
            style={{ width: gScreen.width, height: 230, alignItems: 'center', backgroundColor: 'transparent' }}
            source={require('../assets/images/userbg.jpg')}
        >
            <View style={[styles.header, { width: gScreen.width }]}>
                <Text style={{ color: 'white', fontSize: 16 }}>我的</Text>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.settingContainer}
                    onPress={settingAction}
                >
                    <Icon
                        style={{ width: 20, height: 20 }}
                        name='settings' color="#fff"
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={require('../assets/images/ic_account_myself.png')}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.loginContainer}
                    onPress={loginAction}
                >
                    <Text style={{ color: 'white' }}>点击登录</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    header: {
        height: 50,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingContainer: {
        height: 50,
        width: 50,
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    loginContainer: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2
    },
    cellContainer: {
        borderColor: '#d9d9d9',
        marginTop: 15,
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