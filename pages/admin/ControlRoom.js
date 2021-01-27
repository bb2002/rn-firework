import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import FireWebView from '../../components/common/FireWebView';

const ControlRoom = () => {
    const { adminLogin } = useSelector(({ adminLogin }) => ({
        adminLogin
    }))

    return (
        <SafeAreaView style={Styles.container}>
            <FireWebView 
                targetUrl={`/building_management/room/${adminLogin.adminBuildingNumber}.html`}
                notFoundURL={`/building_management/room/no_building_page.html`}
                attachRootURL={true}
                style={Styles.container} />
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ControlRoom;