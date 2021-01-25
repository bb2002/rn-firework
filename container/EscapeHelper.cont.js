import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { escHelperCallRoom } from '../modules/ScreenMode';
import EscapeHelper from "../pages/user/EscapeHelper"

const EscapeHelperCont = () => {
    const dispatch = useDispatch()

    const { screenMode, beacon, mapView, telephone } = useSelector(({ screenMode, beacon, mapView, telephone }) => ({
        screenMode, beacon, mapView, telephone
    }))

    const moveToCallRoom = () => {
        dispatch(escHelperCallRoom())
    }

    return (
        <EscapeHelper 
            screen={screenMode.escHelper}
            moveToCallRoom={moveToCallRoom}
            beacon={beacon}
            mapView={mapView}
            telephone={telephone} />
    );
};

export default EscapeHelperCont;