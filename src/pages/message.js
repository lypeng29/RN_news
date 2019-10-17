import React, { Component } from 'react';
import { Text, View, ScrollView, Button, StyleSheet,TouchableOpacity } from 'react-native';

import Util from '../common/util';
import Urls from '../common/urls';
import { TextInput } from 'react-native-gesture-handler';
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            tel: '',
            show: true
        };
    }
    _updateText(type,con){
        if(type==1){
            this.setState({ content: con });
        }
        if (type==2) {
            this.setState({ tel: con });
        }
    }
    _submitData(){
        if(this.state.content == ''){
            alert('内容不能为空');
        }else if (this.state.tel == '') {
            alert('电话不能为空');
        }else{
            var url = Urls.guestbook_add;
            var post_data = {
                'content':this.state.content,
                'tel':this.state.tel
            };
            Util.postRequest(url, post_data,function(data){
                alert('提交成功！感谢您的建议！'+data.data.c);
            },function(err) {
                alert(err);
            })
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.title}>问题建议</Text>
                    <TextInput style={{ backgroundColor: '#f1f1f1', padding: 5, height: 100, fontSize: 14, textAlignVertical: 'top' }} placeholder='请在此描述问题或者建议' autoFocus={true} maxLength={200} multiline={true} onChangeText={(newText) => this._updateText(1,newText)}/>
                </View>                
                <View>
                    <Text style={styles.title}>联系方式</Text>
                    <TextInput style={{ backgroundColor: '#f1f1f1', fontSize: 14, padding: 5 }} placeholder='请输入手机号' autoComplete={'email'} keyboardType='phone-pad' onChangeText={(newText) => this._updateText(2,newText)}/>
                </View>
                <View style={{marginTop:20}}>
                    <Button title='提交' style={styles.btn} onPress={this._submitData.bind(this)}/>
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