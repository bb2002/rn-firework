import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, StyleSheet, Text, PermissionsAndroid, Alert } from 'react-native';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import { screenOfUser } from '../modules/ScreenMode';
import { useDispatch } from 'react-redux';

const bluetoothMessages = {
    Unknown: "블루투스를 확인 할 수 없습니다. 다시 시도해주세요.",
    Unsupported: "이 장치는 블루투스를 지원하지 않습니다.",
    Unauthorized: "블루투스 사용 권한이 없습니다. 권한을 설정해주세요.",
    Resetting: "블루투스 초기화 중...",
    PoweredOff: "블루투스 초기화 중...",
    PoweredOn: "블루투스 초기화 중...",
    Denied: "블루투스를 시작 할 수 없습니다."
}

const permissionMessages = {
    Accepted: "권한 초기화 중...",
    Denied: "권한 승인에 오류가 발생했습니다."
}

const firstMessage = "어플리케이션 초기화 중..."

const Intro = ({ beaconSetup }) => {
    const dispatch = useDispatch()

    const [statusMessage, setStatusMessage] = useState(firstMessage)

    const requestPermissions = async () => {
        // 이 장치가 블루투스를 사용 할 수 있는지 확인
        {
            const bluetoothStatus = await BluetoothStateManager.getState()
            setStatusMessage(bluetoothMessages[bluetoothStatus])

            if(bluetoothStatus === "Unknown" || bluetoothStatus === "Unsupported") {
                // 이 장치는 블루투스를 지원하지 않음.
                Alert.alert("블루투스 오류", "이 장치는 블루투스를 지원하지 않습니다.")
                return
            }
        }

        // 위치 권한 요청
        {
            const permissionResult = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

            if(permissionResult !== PermissionsAndroid.RESULTS.GRANTED) {
                // 권한이 승인되지 않음.
                Alert.alert("권한 요청 실패", "일부 권한이 허용되지 않았습니다. 어플리케이션 설정에서 다시 권한을 허용해주세요.")
                setStatusMessage(permissionMessages["Denied"])
                return
            } else {
                // 권한이 승인 됨.
                setStatusMessage(permissionMessages["Accepted"])
            }
        }

        // 블루투스 시작
        {
            try {
                await BluetoothStateManager.requestToEnable()
            } catch(ex) {
                Alert.alert("블루투스 시작 실패", "블루투스가 시작되지 않았습니다. 앱을 다시 시작해주세요.")
                setStatusMessage(bluetoothMessages["Denied"])
                return
            }
        }

        // 비콘 탐색기 시작
        await beaconSetup()
        setStatusMessage("환영합니다.")

        setTimeout(gotoUserMenu, 1500)
    }

    const gotoUserMenu = () => {
        dispatch(screenOfUser())
    }

    useEffect(() => {
        requestPermissions()
    }, [])

    return (
        <SafeAreaView style={Styles.container}>
            <Image source={require("../assets/images/icons/app_icon.png")} style={Styles.icon} />
            <Text style={Styles.statusText}>{statusMessage}</Text>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        width: 120,
        height: 120
    },
    statusText: {
        marginTop: 32
    }
})

export default Intro;