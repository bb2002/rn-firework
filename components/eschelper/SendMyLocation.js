import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ScrollView, Alert, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import { sendMyLocationClient } from '../../libraries/HttpClient';
import { readUser } from '../../libraries/SignUpStorage';
import FireWebView from '../common/FireWebView';


const SendMyLocation = ({ moveToCallRoom, beacon, mapView }) => {
    const [isSending, setIsSending] = useState(false)

    useEffect(() => {
        if(isSending) {
            Alert.alert("전송 중...", "위치 변동에 따라 지속적으로 위치를 보내고 있습니다.", [
                {
                    text: "전송 중지",
                    onPress: () => {
                        setIsSending(false)
                    }
                }
            ])
        }
    }, [isSending, setIsSending])

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
                            <ScrollView horizontal={true} style={Styles.imageContainer}>
                                <Image source={{ uri: mapView.mapURL }} style={Styles.image}/>
                            </ScrollView>
                        )
                    }

                    <Button icon={{name: "send", size: 15, color: "white" }} title={isSending ? "전송 중지" : "전송 시작"} buttonStyle={Styles.sendButton} onPress={() => setIsSending(true)}/>
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