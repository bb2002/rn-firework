import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';


const SendMyLocation = ({ moveToCallRoom, toggleSendLocation }) => {
    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView horizontal={true} style={Styles.imageContainer}>
                <Image source={require("../../assets/images/background/test_map_sample.jpeg")} style={Styles.image}/>
            </ScrollView>

            <Button icon={{name: "send", size: 15, color: "white" }} title="전송 시작" buttonStyle={Styles.sendButton} onPress={toggleSendLocation}/>
            <Button icon={{name: "phone", size: 15, color: "white" }} title="긴급 전화 하기" buttonStyle={Styles.callButton} onPress={moveToCallRoom}/>
        </SafeAreaView>
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