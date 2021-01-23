import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import WebView from 'react-native-webview';
import { Button, Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { readUser, saveUser } from '../../libraries/SignUpStorage';

const SignUp = ({ navigation }) => {
    const [user, setUser] = useState({
        tel: "",
        disability: "no_disa"
    })

    const saveUserAndExit = async () => {
        // 전화번호의 모든 특수문자 제거
        user.tel = user.tel.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi, "")

        if(!user.tel) {
            // 입력값이 없음.
            Alert.alert("전화번호 오류", "전화번호를 입력 해 주세요.")
            return
        }

        await saveUser(user)
        ToastAndroid.show("등록되었습니다.", ToastAndroid.SHORT)
        navigation.goBack()
    }

    useEffect(() => {
        readUser()
            .then((user) => {
                if(user) {
                    setUser(user)
                    Alert.alert(
                        "이미 등록된 사용자",
                        "이미 등록된 사용자 입니다.\n값을 수정하시겠습니까?",
                        [
                          {
                            text: "아니오",
                            onPress: () => navigation.goBack(),
                            style: "cancel"
                          },
                          { 
                              text: "예"
                          }
                        ],
                        { cancelable: false }
                      );
                }
            })
    }, [])

    return (
        <>
        <KeyboardAvoidingView style={Styles.container} behavior="position" enabled>
            <View style={Styles.termsView}>
                <WebView 
                    automaticallyAdjustContentInsets={false}
                    source={{ uri: "https://www.daum.net" }} />
            </View>
            
            <Input
                placeholder="전화번호를 입력해주세요."
                leftIcon={{ type: 'font-awesome', name: 'phone', size: 15, color: "gray" }}
                style={Styles.telInputBox}
                inputStyle={Styles.telInput}
                label="전화번호"
                keyboardType="phone-pad"
                value={user.tel}
                onChangeText={(text) => setUser({...user, tel: text})} />
            <View style={Styles.dropdown}>
                <Picker
                    selectedValue={user.disability}
                    onValueChange={(itemValue, itemIndex) => setUser({ ...user, disability: itemValue })}>
                    <Picker.Item label="장애 없음" value="no_disa" />
                    <Picker.Item label="시각 장애" value="eye_disa" />
                    <Picker.Item label="기타 장애" value="etc_disa" />
                </Picker>
            </View>
        </KeyboardAvoidingView>

        <Button 
            icon={{
                name: "check",
                size: 15,
                color: "white"
            }}
            title="사용자 등록"
            style={Styles.saveButton}
            onPress={saveUserAndExit} />
        </>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    termsView: {
        height: 300,
        marginBottom: 16
    },
    telInputBox: {
        fontSize: 12,
        borderBottomWidth: 0
    },
    telInput: {
        borderBottomWidth: 0
    },
    dropdown: {
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: 8,
        borderColor: "#bdc3c7"
    },
    saveButton: {
        marginTop: 32
    }
})

export default SignUp;