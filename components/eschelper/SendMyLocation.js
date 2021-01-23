import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { readUser } from '../../libraries/SignUpStorage';
import FireWebView from '../common/FireWebView';


const SendMyLocation = ({ moveToCallRoom, toggleSendLocation, beacon, sendMyLocation, sendLocation }) => {
    useEffect(() => {
        if(sendMyLocation.isSending) {
            Alert.alert("전송 중...", "위치 변동에 따라 지속적으로 위치를 보내고 있습니다.", [
                {
                    text: "전송 중지",
                    onPress: () => {
                        toggleSendLocation()
                    }
                },
                {
                    text: "확인"
                }
            ])
        }
    }, [sendMyLocation.isSending])

    useEffect(() => {
        if(beacon.isBeaconDetected) {
            readUser()
                .then((user) => {
                    console.log("SEND LOCATION")
                    sendLocation({
                        uuid: beacon.uuid,
                        phoneNumber: user.tel,
                        status: user.disability
                    })
                })

            
        }
    }, [beacon.uuid])

    return (
        <>
            {
                beacon.isBeaconDetected && (
                <SafeAreaView style={Styles.container}>
                    <ScrollView horizontal={true} style={Styles.imageContainer}>
                        <Image source={require("../../assets/images/background/test_map_sample.jpeg")} style={Styles.image}/>
                    </ScrollView>

                    <Button icon={{name: "send", size: 15, color: "white" }} title={sendMyLocation.isSending ? "전송 중지" : "전송 시작"} buttonStyle={Styles.sendButton} onPress={toggleSendLocation}/>
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