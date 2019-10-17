
import React from "react";
import { View, Text, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "首页",     
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>首页</Text>
                <Text>图文展示</Text>
                <Text>分类展示</Text>
                <Text>商品展示</Text>
                <Button
                    title="跳转到详情"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}
class UsersScreen extends React.Component {
    static navigationOptions = {
        title: "我的",       
    };    
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>用户页面</Text>
                <Text>用户信息展示</Text>
                <Text>展示用户账号，头像，订单，关注，收藏，...</Text>
                <Button
                    title="返回首页"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        );
    }
}
class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: "详情页",
        headerStyle: {
            height: 45
        }        
    };    
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>文章详情或者商品详情页面</Text>
                <Button
                    title="跳转到首页"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="刷新本页面"
                    onPress={() => this.props.navigation.push('Details')}
                />
                <Button
                    title="返回上一页"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}
const bottomTabNavigator = createBottomTabNavigator({
        Home: HomeScreen,
        User: UsersScreen,
    },
    {
        tabBarOptions: {
            activeTintColor: '#f00',
            inactiveTintColor: '#000',
        },
    });
const AppNavigator = createStackNavigator({
    bottomTabNavigator: {
        screen: bottomTabNavigator
    },
    Details: DetailsScreen
}, {
        initialRouteName: "bottomTabNavigator",
        defaultNavigationOptions: {
            headerStyle: {
                height: 0
            }
        },        
});
const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
