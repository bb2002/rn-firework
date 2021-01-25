import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import CallRoom from '../../components/eschelper/CallRoom';
import EscapeMapView from "../../components/eschelper/EscapeMapView"
import SendMyLocation from '../../components/eschelper/SendMyLocation';
import { loadEscapeMap } from '../../modules/MapView';
import { loadTelephoneList } from '../../modules/Telephone';

const EscapeHelper = ({ screen, moveToCallRoom, beacon, mapView, telephone }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadEscapeMap(beacon.uuid))        // 맵 로드
        dispatch(loadTelephoneList(beacon.uuid))    // 전화번호 목록 로드
    }, [beacon.uuid])

    return (
        <SafeAreaView style={Styles.container}>
            {
                screen === "mapview" && (
                    <EscapeMapView moveToCallRoom={moveToCallRoom} beacon={beacon} mapView={mapView} />
                )
            }

            {
                screen === "callroom" && (
                    <CallRoom beacon={beacon} telephone={telephone} />
                )
            }

            {
                screen === "sendlocation" && (
                    <SendMyLocation 
                        moveToCallRoom={moveToCallRoom} 
                        beacon={beacon} 
                        mapView={mapView} />
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