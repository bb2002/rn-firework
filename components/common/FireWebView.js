import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { HttpClientConfig } from '../../libraries/Config';
import {
    View, Text, StyleSheet
} from "react-native"
import axios from 'axios';

const FireWebView = ({ targetUrl, attachRootURL, notFoundURL }) => {
    const [code, setCode] = useState(-1)

    useEffect(() => {
        // HTTP 요청이 404 인지 확인해야합니다.
        // WebView 가 response 를 주지 않아서 답답합니다.
        axios.get(attachRootURL ? HttpClientConfig.WEB_SERVER_ADDRESS + targetUrl : targetUrl)
            .then(response => {
                setCode(response.status)
            })
            .catch(ex => {
                setCode(ex.response.status)
            })
    }, [targetUrl])
    
    return (
        <>
            {
                function () {
                    if(code === -1) {
                        return (
                        <View style={Styles.loadingContainer}>
                            <Text style={Styles.text}>로딩 중...</Text>
                        </View>
                        )
                    } else if(code == 200) {
                        return (
                        <WebView 
                            source={{ uri: attachRootURL ? HttpClientConfig.WEB_SERVER_ADDRESS + targetUrl : targetUrl }}
                            style={{ opacity: 0.99 }} />
                        )
                    } else if(code == 404) {
                        return (
                        <WebView
                            source={{ uri: attachRootURL ? HttpClientConfig.WEB_SERVER_ADDRESS + notFoundURL : notFoundURL }}
                            style={{ opacity: 0.99 }} />
                        )
                    } else {
                        return (
                        <View style={Styles.loadingContainer}>
                            <Text style={Styles.text}>An error occurred.</Text>
                            <Text style={Styles.text}>내부 서버 오류가 발생했습니다.</Text>
                            <Text style={Styles.text}>나중에 다시 시도해주세요.</Text>
                        </View>
                        )
                    }
                }()
            }
        </>
        
    );
};

const Styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 12
    }
})

export default FireWebView;