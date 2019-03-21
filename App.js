import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import HomePage from './src/pages/home';
import CategoryPage from './src/pages/category';
import UserPage from './src/pages/user';
import ExamplePage from './src/pages/example';
import GuestbookPage from './src/pages/guestbook';
import DetailsPage from './src/pages/detail';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";

class LeftBar extends Component {
    constructor(props) {
        super(props);
    }    
    render(){
        return(
            <Icon name="menu" color="#fff" style={{ marginLeft: 5 }} onPress={() => this.props.navigation.push('Category')} />
        )
    }
}
class RightBar extends Component {
    constructor(props) {
        super(props);
    }    
    render() {
        return (
            <Icon name="settings" color="#fff" style={{ marginLeft: 5 }} onPress={() => this.props.navigation.push('Home')} />
        )
    }
}
const bottomTabNavigator = createBottomTabNavigator({
    Home:{
        screen: HomePage,
        navigationOptions: ({ navigation }) => ({
            title: '首页',         
        }),
    },
    Category: {
        screen:CategoryPage,
        navigationOptions: ({ navigation }) => ({
            title: '栏目',
        }),
    },        
    Guestbook: {
        screen:GuestbookPage,
        navigationOptions: ({ navigation }) => ({
            title: '留言',
        }),
    },        
    User: {
        screen:UserPage,
        navigationOptions: ({ navigation }) => ({
            title: '我的',
        }),
    },
    Example: {
        screen: ExamplePage,
        navigationOptions: ({ navigation }) => ({
            title: '示例',
        }),
    }             
    }, {
        defaultNavigationOptions: ({ navigation }) => ({          
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = focused ? 'home' : 'home' ; //可以根据focused更换图标
                } else if (routeName === 'Category') {
                    iconName = 'menu';
                } else if (routeName === 'Guestbook') {
                    iconName = 'message';
                } else if (routeName === 'Example') {
                    iconName = 'android';
                }else {
                    iconName = 'person';
                }
                return <Icon name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            //根据是否激活，改变颜色
            activeTintColor: '#00b600', 
            inactiveTintColor: '#999',
        }
    });
const AppStack = createStackNavigator(
    {
        bottomTabNavigator: {
            screen: bottomTabNavigator
        },
        Details: {
            screen: DetailsPage,
            navigationOptions: {
                title: "文章详情"
            }
        },
        Home:HomePage
    }, {
        initialRouteName: "bottomTabNavigator",
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#2596f3',
                height: 0 //影藏header
            }
        }, 
    });
const AppContainer = createAppContainer(AppStack);

export default class App extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}