import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { escHelperCallRoom } from '../modules/ScreenMode';
import EscapeHelper from "../pages/user/EscapeHelper"

const EscapeHelperCont = () => {
    const dispatch = useDispatch()

    const { screenMode } = useSelector(({ screenMode }) => ({
        screenMode
    }))

    const moveToCallRoom = () => {
        dispatch(escHelperCallRoom())
    }

    const toggleSendLocation = () => {
        
    }

    return (
        <EscapeHelper screen={screenMode.escHelper} moveToCallRoom={moveToCallRoom} toggleSendLocation={toggleSendLocation}/>
    );
};

export default EscapeHelperCont;