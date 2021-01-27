import React from 'react';
import { 
    Alert,
    Image, 
    SafeAreaView, 
    StyleSheet, 
    View
} from 'react-native';
import FireWebView from "../../components/common/FireWebView"

const AdminMenu = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <FireWebView targetUrl={`/register`} attachRootURL={true} />
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default AdminMenu;