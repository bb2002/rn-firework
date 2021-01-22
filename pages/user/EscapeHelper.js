import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import CallRoom from '../../components/eschelper/CallRoom';
import EscapeMapView from "../../components/eschelper/EscapeMapView"
import SendMyLocation from '../../components/eschelper/SendMyLocation';

const EscapeHelper = ({ screen, moveToCallRoom, toggleSendLocation }) => {
    return (
        <SafeAreaView style={Styles.container}>
            {
                screen === "mapview" && (
                    <EscapeMapView moveToCallRoom={moveToCallRoom} />
                )
            }

            {
                screen === "callroom" && (
                    <CallRoom />
                )
            }

            {
                screen === "sendlocation" && (
                    <SendMyLocation moveToCallRoom={moveToCallRoom} toggleSendLocation={toggleSendLocation}/>
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