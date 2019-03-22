import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var id = this.props.navigation.getParam('id', '1');
        var url = 'http://news.dpshop.net/appview/'+id+'.html';
        return (
            <View style={{ backgroundColor: "write", flex: 1 }}>
                <WebView
                    startInLoadingState={true}
                    contentInset={{ top: 0, bottom: -120 }}
                    source={{ uri: url }} />
            </View>
        )
    }
}