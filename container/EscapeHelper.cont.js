import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { escHelperCallRoom } from '../modules/ScreenMode';
import EscapeHelper from "../pages/user/EscapeHelper"
import { sendCurrentLocation, toggleSendMyLocation } from "../modules/SendMyLocation"

const EscapeHelperCont = () => {
    const dispatch = useDispatch()

    const { screenMode, beacon, sendMyLocation } = useSelector(({ screenMode, beacon, sendMyLocation }) => ({
        screenMode, beacon, sendMyLocation
    }))

    const moveToCallRoom = () => {
        dispatch(escHelperCallRoom())
    }

    const toggleSendLocation = () => {
        dispatch(toggleSendMyLocation())
    }

    const sendLocation = (data) => {
        sendCurrentLocation(data)
    }

    return (
        <EscapeHelper 
            screen={screenMode.escHelper}
            moveToCallRoom={moveToCallRoom}
            toggleSendLocation={toggleSendLocation}
            sendLocation={sendLocation}
            sendMyLocation={sendMyLocation}
            beacon={beacon} />
    );
};

export default EscapeHelperCont;