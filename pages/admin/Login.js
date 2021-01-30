import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ButtonGroup, Input, Button, CheckBox } from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome"
import { HttpClientConfig } from '../../libraries/Config';
import { adminAutoLogin, ADMIN_LOGIN_PASSWORD } from '../../modules/Login';
import * as WebBrowser from 'expo-web-browser';
import { readToken } from '../../libraries/AutoLoginStorage';

const Login = ({ gotoUserMode, login, loading, autoLogin }) => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        autoLogin: false
    })

    const onPressButtonGroup = (value) => {
        switch(value) {
            case 0:
                gotoUserMode()
                break
            case 1:
                async function openRegister() {
                    await WebBrowser.openBrowserAsync(`${HttpClientConfig.WEB_SERVER_ADDRESS}/register`)
                }
                openRegister()
                break
            case 2:
                async function openPw() {
                    await WebBrowser.openBrowserAsync(`${HttpClientConfig.WEB_SERVER_ADDRESS}/forget_pw`)
                }
                openPw()
                break
        }
    }

    useEffect(() => {
        readToken()
            .then(value => {
                if(value != null) {
                    autoLogin(value)
                }
            })
    }, [])

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
                secureTextEntry={true}
                onChangeText={value => setForm({ ...form, password: value })}
                />
            <CheckBox
                title="자동 로그인을 사용할까요?"
                checked={form.autoLogin}
                onPress={() => setForm({ ...form, autoLogin: !form.autoLogin })}
                containerStyle={Styles.checkbox}
                textStyle={Styles.checkboxText} />
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
        marginHorizontal: 10
    },
    checkbox: {
        alignSelf: "stretch",
        marginHorizontal: 8,
        backgroundColor: "#00000000",
        borderWidth: 0
    },
    checkboxText: {
        fontWeight: "normal"
    }
})

export default Login;