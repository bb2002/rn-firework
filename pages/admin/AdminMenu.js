import React from 'react';
import { 
    Alert,
    Image, 
    SafeAreaView, 
    StyleSheet, 
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MenuList from '../../components/menu/MenuList';
import { resetAdminLogin } from '../../modules/Login';
import { screenOfUser } from '../../modules/ScreenMode';
import FireWebView from "../../components/common/FireWebView"
import { HttpClientConfig } from '../../libraries/Config';
import { removeToken } from '../../libraries/AutoLoginStorage';

const AdminMenu = ({ navigation }) => {
    const dispatch = useDispatch()
    const { adminLogin } = useSelector(({ adminLogin }) => ({
        adminLogin
    }))

    const menuTitles = [
        "상황 검색",
        "방재실/수신반 관리",
        "건물 이력 관리",
        "피난 안내도 등록",
        "피난 안내도 검색",
        "관리모드 사용법",
        "사용자 모드",
        "로그아웃"
    ]
    
    const menuIcons = [
        require("../../assets/images/icons/icon_status.png"),
        require("../../assets/images/icons/icon_settings.png"),
        require("../../assets/images/icons/icon_building.png"),
        require("../../assets/images/icons/icon_add_map.png"),
        require("../../assets/images/icons/icon_search_map.png"),
        require("../../assets/images/icons/icon_info.png"),
        require("../../assets/images/icons/icon_back.png"),
        require("../../assets/images/icons/icon_logout.png")
    ]

    const gotoUserMode = () => {
        Alert.alert("전환", "사용자 모드로 전환하시겠습니까?", [
            {
                text: "전환",
                onPress: () => {
                    dispatch(resetAdminLogin())
                    dispatch(screenOfUser())
                }
            },
            {
                text: "취소"
            }
        ])
    }

    const logout = () => {
        Alert.alert("로그아웃", "자동로그인을 해제하고 사용자 모드로 전환하시겠습니까?", [
            {
                text: "로그아웃",
                onPress: async () => {
                    await removeToken()
                    dispatch(resetAdminLogin())
                    dispatch(screenOfUser())
                }
            },
            {
                text: "취소"
            }
        ])
    }

    const menuHandler = [
        () => { navigation.navigate("SearchStatus") },
        () => { navigation.navigate("ControlRoom") },
        () => { navigation.navigate("Building") },
        () => { navigation.navigate("AddMapAdmin") },
        () => { navigation.navigate("SearchMapAdmin") },
        () => { navigation.navigate("Manual") },
        gotoUserMode,
        logout
    ]

    return (
        <SafeAreaView style={Styles.container}>
            <View style={Styles.buildingInfoView}>
                {
                    adminLogin.adminBuildingNumber === "" && (
                        <FireWebView targetUrl={`${HttpClientConfig.WEB_SERVER_ADDRESS}/safe_no_beacon`} />
                    )
                }
                {
                    adminLogin.adminBuildingNumber !== "" && (
                        <FireWebView 
                            targetUrl={`/building_management/image/${adminLogin.adminBuildingNumber}.html`} 
                            notFoundURL="/building_management/image/no_building_page.html"
                            attachRootURL={true} />
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

export default AdminMenu;