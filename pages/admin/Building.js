import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HttpClientConfig } from '../../libraries/Config';
import FireWebView from '../../components/common/FireWebView';

const Building = () => {
    const { adminLogin } = useSelector(({ adminLogin }) => ({
        adminLogin
    }))

    return (
        <SafeAreaView style={Styles.container}>
            <FireWebView targetUrl={`${HttpClientConfig.WEB_SERVER_ADDRESS}/history/${adminLogin.adminBuildingNumber}`} style={Styles.container}/>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Building;