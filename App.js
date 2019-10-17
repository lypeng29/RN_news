import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import HomePage from './src/pages/home';
import CategoryPage from './src/pages/category';
import ArticlePage from './src/pages/article';
import UserPage from './src/pages/user';
import GuestbookPage from './src/pages/guestbook';
import MessagePage from './src/pages/message';
import DetailsPage from './src/pages/details';
import SettingsPage from './src/pages/settings';
import LoginPage from './src/pages/login';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

const bottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: ({ navigation }) => ({
      title: '首页',
    }),
  },
  Category: {
    screen: CategoryPage,
    navigationOptions: ({ navigation }) => ({
      title: '分类',
    }),
  },  
  Message: {
    screen: MessagePage,
    navigationOptions: ({ navigation }) => ({
      title: '留言',
    }),
  },  
  User: {
    screen: UserPage,
    navigationOptions: ({ navigation }) => ({
      title: '我的',
    }),
  }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = focused ? 'home' : 'home'; //可以根据focused更换图标
      } else if (routeName === 'Category') {
        iconName = 'menu';
      } else if (routeName === 'Message') {
        iconName = 'message';
      } else {
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
    Article: {
      screen: ArticlePage,
      navigationOptions: {
        title: "文章列表",
        headerTintColor: '#666',
        headerStyle: {
          backgroundColor: '#f8f8f8',
          height: 45
        },
        headerTitleStyle: {
          fontSize: 16
        }
      }
    },
    Details: {
      screen: DetailsPage,
      navigationOptions: {
        title: "文章详情",
        headerTintColor: '#666',
        headerStyle: {
          backgroundColor: '#f8f8f8',
          height: 45
        },
        headerTitleStyle: {
          fontSize: 16
        }
      }
    },
    Guestbook: GuestbookPage,
    Category: CategoryPage,
    Settings: SettingsPage,
    Login: LoginPage,
  }, {
  initialRouteName: "bottomTabNavigator",
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#f8f8f8',
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