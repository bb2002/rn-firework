import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import CallItem from './CallItem';

const CallRoom = ({ beacon }) => {
    return (
        <>
        {
            beacon.isBeaconDetected && (
                <SafeAreaView style={Styles.container}>
                    <ScrollView style={Styles.scrollView}>
                        <CallItem roomName="관리실" tel="010-4917-4155" />
                    </ScrollView>
                </SafeAreaView>
            )
        }
        {
            !beacon.isBeaconDetected && (
                <SafeAreaView style={{...Styles.container, ...{justifyContent: "center", alignItems: "center"}} }>
                    <Text>현재 위치는 스마트 피난 안내도 서비스를 제공하지 않습니다.</Text>
                </SafeAreaView>
            )
        }
        </>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        paddingVertical: 16
    }
})

export default CallRoom;