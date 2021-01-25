import { combineReducers } from "redux";
import screenMode from "./ScreenMode"
import beacon from "./Beacon"
import loading from "./Loading"
import adminLogin, { adminLoginSaga } from "./Login";
import buildingMainPage, { buildingMainPageSaga } from "./BuildingMainPage"
import mapView, { mapViewSaga } from "./MapView"
import telephone, { telephoneSaga } from "./Telephone"
import { all } from "redux-saga/effects"

const rootReducer = combineReducers({
    screenMode,
    beacon,
    loading,
    adminLogin,
    buildingMainPage,
    mapView,
    telephone
})

export function* rootSaga() {
    yield all([ 
        adminLoginSaga(), 
        buildingMainPageSaga(),
        mapViewSaga(),
        telephoneSaga()
    ])
}

export default rootReducer