import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import FireWebView from '../../components/common/FireWebView';
import { HttpClientConfig } from '../../libraries/Config';

const SearchStatus = () => {
    const { adminLogin } = useSelector(({ adminLogin }) => ({
        adminLogin
    }))

    return (
        <SafeAreaView style={Styles.container}>
            <FireWebView 
                targetUrl={`${HttpClientConfig.WEB_SERVER_ADDRESS}/situation/${adminLogin.adminBuildingNumber}`}
                useGoBack={true}
                style={Styles.container}/>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SearchStatus;