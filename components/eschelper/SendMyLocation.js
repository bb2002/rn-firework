import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ScrollView, Alert, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { sendMyLocationClient, stopSendMyLocation } from '../../libraries/HttpClient';
import { readUser } from '../../libraries/SignUpStorage';
import FireWebView from '../common/FireWebView';


const SendMyLocation = ({ moveToCallRoom, beacon, mapView, navigation }) => {
    const [isSending, setIsSending] = useState(false)

    useEffect(() => {
        if(isSending) {
            Alert.alert("전송 중...", "위치 변동에 따라 지속적으로 위치를 보내고 있습니다.", [
                {
                    text: "전송 중지",
                    onPress: () => {
                        setIsSending(false)
                    }
                },
                {
                    text: "닫기"
                }
            ])
        } else {
            async function fetch() {
                try {
                    const user = await readUser()
                    await stopSendMyLocation(user.tel)
                } catch(ex) {  }
            }

            fetch()
        }

        return fetch
    }, [isSending, setIsSending])

    useEffect(() => {
        async function fetch() {
            try {
                const user = await readUser()
                await stopSendMyLocation(user.tel)
            } catch(ex) {  }
        }

        readUser()
                .then((user) => {
                    if(!user) {
                        Alert.alert("이용자 등록 필요", "등록되지 않은 사용자 입니다.\n메뉴의 사용자 등록에서 먼저 사용자 등록을 해주세요.",[
                            {
                                text: "확인",
                                onPress: () => {
                                    navigation.goBack()
                                }
                            }
                        ])
                    }
                })

        return fetch
    }, [])

    useEffect(() => {
        if(beacon.isBeaconDetected && isSending) {
            readUser()
                .then((user) => {
                    sendMyLocationClient({
                        uuid: beacon.uuid,
                        phoneNumber: user.tel,
                        status: user.disability
                    })
                    .catch(ex => {
                        ToastAndroid.show("위치 정보 전송에 실패했습니다.", ToastAndroid.SHORT)
                    })
                })
        }
    }, [beacon.uuid, isSending])

    return (
        <>
            {
                beacon.isBeaconDetected && (
                <SafeAreaView style={Styles.container}>
                    {
                        mapView.postCode === "" && (
                            // 맵이 없음.
                            <FireWebView targetUrl={mapView.mapURL} />
                        )
                    }
                    {
                        mapView.postCode !== "" && (
                            <FireWebView 
                                targetUrl={mapView.mapURL} 
                                style={Styles.image} 
                                attachRootURL={false} />
                        )
                    }

                    <Button icon={{name: isSending ? "local-post-office" : "send", size: 15, color: "white" }} title={isSending ? "전송 중..." : "전송 시작"} buttonStyle={Styles.sendButton} onPress={() => setIsSending(!isSending)}/>
                    <Button icon={{name: "phone", size: 15, color: "white" }} title="긴급 전화 하기" buttonStyle={Styles.callButton} onPress={moveToCallRoom}/>
                </SafeAreaView>
                )
            }

            {
                !beacon.isBeaconDetected && (
                    <FireWebView targetUrl="/safe_no_map" attachRootURL={true} />
                )
            }
        </>
        
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    imageContainer: {
        height: 100
    },
    image: {
        height: "100%",
        width: 600,
        resizeMode: "contain"
    },
    callButton: {
        padding: 16,
        marginTop: 4
    },
    sendButton: {
        padding: 16,
        marginVertical: 4,
        backgroundColor: "#e74c3c"
    }
})

export default SendMyLocation;