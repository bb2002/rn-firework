import { combineReducers } from "redux";
import screenMode from "./ScreenMode"
import beacon from "./Beacon"
import loading from "./Loading"
import adminLogin, { adminLoginSaga } from "./Login";
import sendMyLocation, { sendMyLocationSaga } from "./SendMyLocation"
import { all } from "redux-saga/effects"

const rootReducer = combineReducers({
    screenMode,
    beacon,
    loading,
    adminLogin,
    sendMyLocation
})

export function* rootSaga() {
    yield all([ adminLoginSaga(), sendMyLocationSaga() ])
}

export default rootReducer