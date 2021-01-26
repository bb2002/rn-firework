import { combineReducers } from "redux";
import screenMode from "./ScreenMode"
import beacon from "./Beacon"
import loading from "./Loading"
import adminLogin, { adminLoginSaga } from "./Login";
import mapView, { mapViewSaga } from "./MapView"
import telephone, { telephoneSaga } from "./Telephone"
import buildingNumber, { buildingNumberSaga } from "./BuildingNumber"
import { all } from "redux-saga/effects"

const rootReducer = combineReducers({
    screenMode,
    beacon,
    loading,
    adminLogin,
    mapView,
    telephone,
    buildingNumber
})

export function* rootSaga() {
    yield all([ 
        adminLoginSaga(), 
        mapViewSaga(),
        telephoneSaga(),
        buildingNumberSaga()
    ])
}

export default rootReducer