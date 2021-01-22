import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ButtonGroup, Input, Button } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"
import { ADMIN_LOGIN_PASSWORD } from '../../modules/Login';

const Login = ({ gotoUserMode, login, loading }) => {
    
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const onPressButtonGroup = (value) => {
        const SendIntentAndroid = require('react-native-send-intent');

        switch(value) {
            case 0:
                gotoUserMode()
                break
            case 1:
                SendIntentAndroid.openChromeIntent("https://www.google.com")
                break
            case 2:
                SendIntentAndroid.openChromeIntent("https://www.google.com")
                break
        }
    }

    return (
        <SafeAreaView style={Styles.container}>
             <Input
                placeholder="ID 입력"
                label="아이디 입력"
                leftIcon={{ type: 'font-awesome', name: 'user', size: 18 }}
                style={Styles.inputStyle}
                onChangeText={value => setForm({ ...form, username: value })}
                />
            <Input
                placeholder="비밀번호 입력"
                label="비밀번호 입력"
                leftIcon={{ type: 'font-awesome', name: 'lock', size: 18 }}
                style={Styles.inputStyle}
                onChangeText={value => setForm({ ...form, username: value })}
                />
            <Button
                icon={<Icon name="sign-in" color="white" size={15} />}
                title={loading[ADMIN_LOGIN_PASSWORD] ? "처리 중..." : "로그인"}
                containerStyle={Styles.buttonSize}
                onPress={() => login(form)} />
            <ButtonGroup
                buttons={[ "돌아가기", "관리자 가입", "ID/PW 찾기" ]}
                onPress={(value) => onPressButtonGroup(value)} />
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 32,
        flexDirection: "column"
    },
    inputStyle: {
        fontSize: 14
    },
    buttonSize: {
        alignSelf: "stretch",
        marginHorizontal: 8
    }
})

export default Login;