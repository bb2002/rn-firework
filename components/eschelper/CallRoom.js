import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import CallItem from './CallItem';

const CallRoom = ({ beacon, telephone }) => {
    return (
        <>
        {
            function () {
                if(!beacon.isBeaconDetected) {
                    // 현재 비콘이 없는 경우
                    return (
                    <SafeAreaView style={{...Styles.container, ...{justifyContent: "center", alignItems: "center"}} }>
                        <Text>현재 위치는 스마트 피난 안내도 서비스를 제공하지 않습니다.</Text>
                    </SafeAreaView>
                    )
                }

                if(telephone.tel.length === 0) {
                    // 전화번호 목록이 전혀 없는 경우
                    return (
                    <SafeAreaView style={{...Styles.container, ...{justifyContent: "center", alignItems: "center"}} }>
                        <Text>현재 위치는 전화번호 목록을 제공하지 않습니다.</Text>
                    </SafeAreaView>
                    )
                }

                if(beacon.isBeaconDetected) {
                    return (
                    <SafeAreaView style={Styles.container}>
                        <ScrollView style={Styles.scrollView}>
                            {
                                telephone.tel.map(tel => <CallItem roomName={tel.type} tel={tel.phoneNumber} key={tel.phoneNumber} />)
                            }
                            
                        </ScrollView>
                    </SafeAreaView>
                    )
                }
            }()
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