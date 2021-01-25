import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { HttpClientConfig } from '../../libraries/Config';

const FireWebView = ({ targetUrl, attachRootURL }) => {
    return (
        <WebView 
            source={{ uri: attachRootURL ? HttpClientConfig.WEB_SERVER_ADDRESS + targetUrl : targetUrl }}
            style={{ opacity: 0.99 }}
        />
    );
};

export default FireWebView;