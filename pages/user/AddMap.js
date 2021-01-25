import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import FireWebView from '../../components/common/FireWebView';
import { HttpClientConfig } from '../../libraries/Config';

const AddMap = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <FireWebView targetUrl={`${HttpClientConfig.WEB_SERVER_ADDRESS}/user_add_map`} style={Styles.container}/>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default AddMap;