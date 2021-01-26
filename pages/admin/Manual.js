import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { HttpClientConfig } from '../../libraries/Config';
import FireWebView from '../../components/common/FireWebView';

const Manual = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <FireWebView targetUrl={`${HttpClientConfig.WEB_SERVER_ADDRESS}/manager_info`} style={Styles.container}/>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Manual;