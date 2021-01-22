import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

const CallItem = ({ roomName, tel }) => {
    return (
        <View style={Styles.wrapper}>
            <View style={Styles.container}>
                <View style={Styles.containerVert}>
                    <Text style={Styles.roomName}>관리실</Text>
                    <Text style={Styles.telView}>010-1234-5678</Text>
                </View>

                <Button icon={{name: "phone", size: 24, color: "black" }} buttonStyle={Styles.telButton}/>
                
            </View>
            <View style={Styles.hr} />
        </View>
    );
};

const Styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center"
    },  
    container: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 32,
        marginVertical: 8
    },
    containerVert: {
        flex: 1,
        flexDirection: "column"
    },
    roomName: {
        flex: 1,
        color: "black",
        fontSize: 18
    },
    telView: {
        color: "#7f8c8d"
    },
    telButton: {
        width: 48,
        height: 48,
        backgroundColor: "#00000000"
    },
    hr: {
        width: 256,
        borderBottomColor: "#bdc3c7",
        borderBottomWidth: 0.5,
        marginVertical: 4
    }
})

export default CallItem;