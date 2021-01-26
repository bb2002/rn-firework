import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '../pages/user/Menu';

const MenuCont = ({ navigation }) => {
    const { buildingNumber } = useSelector(({ buildingNumber }) => ({
        buildingNumber
    }))

    return (
        <Menu navigation={navigation} buildingNumber={buildingNumber.buildingNumber} />
    );
};

export default MenuCont;