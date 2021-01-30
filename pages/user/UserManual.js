import React from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import FireWebView from '../../components/common/FireWebView';
import { HttpClientConfig } from '../../libraries/Config';

const UserManual = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <FireWebView 
                targetUrl="/user_manual"
                attachRootURL={true}
                style={Styles.image}
            />
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