import { combineReducers } from "redux";
import screenMode from "./ScreenMode"
import beacon from "./Beacon"
import loading from "./Loading"
import adminLogin, { adminLoginSaga } from "./Login";
import { all } from "redux-saga/effects"

const rootReducer = combineReducers({
    screenMode,
    beacon,
    loading,
    adminLogin
})

export function* rootSaga() {
    yield all([ adminLoginSaga() ])
}

export default rootReducer