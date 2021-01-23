import React from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import FireWebView from '../../components/common/FireWebView';
import { HttpClientConfig } from '../../libraries/Config';

const UserManual = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <Image source={{uri: `${HttpClientConfig.WEB_SERVER_ADDRESS}/user_manual.png`}} style={Styles.image}/>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: "contain"
    }
})

export default UserManual;