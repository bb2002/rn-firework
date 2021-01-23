import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginPassword, resetAdminLogin } from '../modules/Login';
import { screenOfUser } from '../modules/ScreenMode';
import Login from '../pages/admin/Login';

const LoginCont = ({ navigation }) => {
    const dispatch = useDispatch()

    const { loading, adminLogin } = useSelector(({ loading, adminLogin }) => ({
        loading, adminLogin
    }))

    const gotoUserMode = () => {
        dispatch(screenOfUser())
    }

    const login = (user) => {
        if(!user.username || !user.password) {
            Alert.alert("입력 오류", "일부 값이 입력되지 않았습니다.\n아이디 또는 비밀번호를 확인하세요.")
            return
        }
        dispatch(adminLoginPassword(user))
    }

    useEffect(() => {

        // DEBUG!!!!!!!!
        //navigation.replace("Menu")
        //return

        if(adminLogin.error) {
            switch(adminLogin.error.status) {
                case 404: {
                    Alert.alert("로그인 오류", "아이디 또는 비밀번호가 잘못되었습니다.")
                    break
                }

                case 500: {
                    Alert.alert("서버 오류", "내부 서버 오류가 발생했습니다.\n다시 시도해주세요.")
                    break
                }

                case 403: {
                    Alert.alert("승인되지 않음", "이 계정은 승인되지 않았습니다.\n관리자에게 문의 해 주세요.")
                    break
                }

                default: {
                    Alert.alert("알 수 없는 오류", "알 수 없는 오류가 발생했습니다.\n다시 시도해주세요.")
                }
            }
            dispatch(resetAdminLogin())
        } else if(adminLogin.token) {
            navigation.navigate("Menu")
        }
    }, [adminLogin])

    return (
        <Login gotoUserMode={gotoUserMode} login={login} loading={loading} adminLogin={adminLogin} />
    );
};

export default LoginCont;