import React from 'react';
import { 
    Alert,
    Image, 
    SafeAreaView, 
    StyleSheet, 
} from 'react-native';
import { useDispatch } from 'react-redux';
import MenuList from '../../components/menu/MenuList';
import { resetAdminLogin } from '../../modules/Login';
import { screenOfUser } from '../../modules/ScreenMode';

const AdminMenu = ({ navigation }) => {
    const dispatch = useDispatch()

    const menuTitles = [
        "상황 검색",
        "방재실/수신반 관리",
        "건물 이력 관리",
        "피난 안내도 등록",
        "피난 안내도 검색",
        "관리모드 사용법",
        "사용자 페이지"
    ]
    
    const menuIcons = [
        require("../../assets/images/icons/icon_status.png"),
        require("../../assets/images/icons/icon_settings.png"),
        require("../../assets/images/icons/icon_building.png"),
        require("../../assets/images/icons/icon_add_map.png"),
        require("../../assets/images/icons/icon_search_map.png"),
        require("../../assets/images/icons/icon_info.png"),
        require("../../assets/images/icons/icon_logout.png")
    ]

    const gotoUserMode = async () => {
        Alert.alert("로그아웃", "관리자 모드에서 나가시겠습니까?", [
            {
                text: "나가기",
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

    const menuHandler = [
        () => { navigation.navigate("SearchStatus") },
        () => { navigation.navigate("ControlRoom") },
        () => { navigation.navigate("Building") },
        () => { navigation.navigate("AddMapAdmin") },
        () => { navigation.navigate("SearchMapAdmin") },
        () => { navigation.navigate("Manual") },
        gotoUserMode
    ]

    return (
        <SafeAreaView style={Styles.container}>
            <Image source={require("../../assets/images/background/test_menu_title.png")} />
            
            <MenuList titles={menuTitles} icons={menuIcons} eventHandlers={menuHandler} length={7}/>
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
   
})

export default AdminMenu;