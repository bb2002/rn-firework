import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';


const EscapeMapView = ({ moveToCallRoom }) => {
    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView horizontal={true} style={Styles.imageContainer}>
                <Image source={require("../../assets/images/background/test_map_sample.jpeg")} style={Styles.image}/>
            </ScrollView>

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
    }
})

export default EscapeMapView;