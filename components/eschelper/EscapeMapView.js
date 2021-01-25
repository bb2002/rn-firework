import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import FireWebView from '../common/FireWebView';


const EscapeMapView = ({ moveToCallRoom, beacon, mapView }) => {
    return (
        <SafeAreaView style={Styles.container}>

            {
                beacon.isBeaconDetected && (
                    <>
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
        
                    <Button icon={{name: "phone", size: 15, color: "white" }} title="긴급 전화 하기" buttonStyle={Styles.callButton} onPress={moveToCallRoom}/>
                    </>
                )
            }

            {
                !beacon.isBeaconDetected && (
                    <FireWebView targetUrl={`/safe_no_beacon`} attachRootURL={true} />
                )
            }
            
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
        width: 600,
        resizeMode: "contain"
    },
    callButton: {
        padding: 16,
        marginTop: 4
    }
})

export default EscapeMapView;