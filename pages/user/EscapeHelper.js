import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import CallRoom from '../../components/eschelper/CallRoom';
import EscapeMapView from "../../components/eschelper/EscapeMapView"
import SendMyLocation from '../../components/eschelper/SendMyLocation';

const EscapeHelper = ({ screen, moveToCallRoom, toggleSendLocation, beacon, sendMyLocation, sendLocation }) => {
    return (
        <SafeAreaView style={Styles.container}>
            {
                screen === "mapview" && (
                    <EscapeMapView moveToCallRoom={moveToCallRoom} beacon={beacon} />
                )
            }

            {
                screen === "callroom" && (
                    <CallRoom beacon={beacon} />
                )
            }

            {
                screen === "sendlocation" && (
                    <SendMyLocation 
                        moveToCallRoom={moveToCallRoom} 
                        toggleSendLocation={toggleSendLocation} 
                        beacon={beacon} 
                        sendMyLocation={sendMyLocation} 
                        sendLocation={sendLocation} />
                )
            }
           
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default EscapeHelper;