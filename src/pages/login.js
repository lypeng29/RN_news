import React, { Component } from 'react';
import { Text, View, ScrollView, Button, StyleSheet,TouchableOpacity } from 'react-native';

import Util from '../common/util';
import Urls from '../common/urls';
import { TextInput } from 'react-native-gesture-handler';
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            show: true
        };
    }
    _updateText(type,con){
        if(type==1){
            this.setState({ username: con });
        }
        if (type==2) {
            this.setState({ password: con });
        }
    }
    _submitData(){
        if(this.state.username == ''){
            alert('账号不能为空');
        }else if (this.state.password == '') {
            alert('密码不能为空');
        }else{
            var url = Urls.login;
            var post_data = {
                'username':this.state.username,
                'password':this.state.password
            };
            Util.postRequest(url, post_data,function(data){
                alert('登录成功！感谢您的建议！'+data.data.token);
            },function(err) {
                alert(err);
            })
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.title}>账号</Text>
                    <TextInput style={{ backgroundColor: '#f1f1f1', padding: 5, fontSize: 14 }} placeholder='请输入手机号或者邮箱' keyboardType='phone-pad' autoFocus={true} maxLength={30} onChangeText={(newText) => this._updateText(1,newText)}/>
                </View>                
                <View>
                    <Text style={styles.title}>密码</Text>
                    <TextInput style={{ backgroundColor: '#f1f1f1', fontSize: 14, padding: 5 }} placeholder='请输入密码' secureTextEntry={true} maxLength={20} onChangeText={(newText) => this._updateText(2,newText)}/>
                </View>
                <View style={{marginTop:20}}>
                    <Button title='登录' style={styles.btn} onPress={this._submitData.bind(this)}/>
                </View>
            </ScrollView>
        )
    }   
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:10
    },
    btn:{
        borderRadius:10
    },
    title:{
        fontWeight:"400",
        color:"#666",
        fontSize:18,
        marginTop:15,
        marginBottom:10
    }
})