import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import FireWebView from '../../components/common/FireWebView';

const SearchStatus = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <FireWebView targetUrl="https://www.daum.net" style={Styles.container}/>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SearchStatus;