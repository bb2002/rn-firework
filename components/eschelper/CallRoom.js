import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import CallItem from './CallItem';

const CallRoom = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <ScrollView style={Styles.scrollView}>
                <CallItem />
                <CallItem />
                <CallItem />
                <CallItem />
                <CallItem />
                <CallItem />
                <CallItem />
            </ScrollView>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        paddingVertical: 16
    }
})

export default CallRoom;