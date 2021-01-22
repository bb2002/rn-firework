import React from 'react';
import { WebView } from 'react-native-webview';

const FireWebView = ({ targetUrl }) => {
    return (
        <WebView 
            source={{ uri: targetUrl }}
        />
    );
};

export default FireWebView;