import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FireWebView from '../../components/common/FireWebView';

const SearchMap = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <FireWebView targetUrl="/search" style={Styles.container} attachRootURL={true} />
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SearchMap;