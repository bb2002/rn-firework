import React from 'react';
import { 
    SafeAreaView, 
    StyleSheet, 
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import MenuList from '../../components/menu/MenuList';
import { escHelperCallRoom, escHelperMapView, escHelperSendLocation, screenOfAdmin } from '../../modules/ScreenMode';
import FireWebView from "../../components/common/FireWebView"
import { HttpClientConfig } from '../../libraries/Config';

const Menu = ({ navigation, buildingNumber }) => {
    const dispatch = useDispatch()

    const menuTitles = [
        "피난 경로 보기",
        "상황실과 통화",
        "내 위치 전송",
        "사용자 등록",
        "피난 안내도 검색",
        "피난 안내도 등록",
        "이용 안내",
        "관리자 모드"
    ]
    
    const menuIcons = [
        require("../../assets/images/icons/icon_esacpe_location.png"),
        require("../../assets/images/icons/icon_call_room.png"),
        require("../../assets/images/icons/icon_send_my_location.png"),
        require("../../assets/images/icons/icon_signin_user.png"),
        require("../../assets/images/icons/icon_search_map.png"),
        require("../../assets/images/icons/icon_add_map.png"),
        require("../../assets/images/icons/icon_info.png"),
        require("../../assets/images/icons/icon_admin.png")
    ]

    const menuHandler = [
        () => { dispatch(escHelperMapView()); navigation.navigate("EscapeHelper") },
        () => { dispatch(escHelperCallRoom()); navigation.navigate("EscapeHelper") },
        () => { dispatch(escHelperSendLocation()); navigation.navigate("EscapeHelper") },
        () => { navigation.navigate("SignUp") },
        () => { navigation.navigate("SearchMap") },
        () => { navigation.navigate("AddMap") },
        () => { navigation.navigate("UserGuide") },
        () => { dispatch(screenOfAdmin()) }
    ]

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.buildingInfoView}>
                {
                    buildingNumber === "" && (
                        <FireWebView targetUrl={`${HttpClientConfig.WEB_SERVER_ADDRESS}/safe_no_beacon`} />
                    )
                }
                {
                    buildingNumber !== "" && (
                        <FireWebView targetUrl={`${HttpClientConfig.WEB_SERVER_ADDRESS}/building_management/image/${buildingNumber}.html`} />
                    )
                }
            </View>

            
            <MenuList titles={menuTitles} icons={menuIcons} eventHandlers={menuHandler} length={8}/>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buildingInfoView: {
        height: 240
    }
})

export default Menu;