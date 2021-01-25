import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '../pages/user/Menu';

const MenuCont = ({ navigation }) => {
    const { buildingMainPage } = useSelector(({ buildingMainPage }) => ({
        buildingMainPage
    }))

    return (
        <Menu navigation={navigation} mainPage={buildingMainPage.url} />
    );
};

export default MenuCont;