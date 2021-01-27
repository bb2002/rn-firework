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
        <FireWebView 
            targetUrl={`/building_management/history/${adminLogin.adminBuildingNumber}.html`}
            notFoundURL={`/building_management/history/no_building_page.html`}
            attachRootURL={true}
            style={Styles.container} />
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Building;