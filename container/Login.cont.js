import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginPassword } from '../modules/Login';
import { screenOfUser } from '../modules/ScreenMode';
import Login from '../pages/admin/Login';

const LoginCont = () => {
    const dispatch = useDispatch()

    const { loading, adminLogin } = useSelector(({ loading, adminLogin }) => ({
        loading, adminLogin
    }))

    const gotoUserMode = () => {
        dispatch(screenOfUser())
    }

    const login = (user) => {
        dispatch(adminLoginPassword(user))
    }

    return (
        <Login gotoUserMode={gotoUserMode} login={login} loading={loading} />
    );
};

export default LoginCont;