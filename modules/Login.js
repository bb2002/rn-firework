import { createAction, handleActions } from "redux-actions"
import { adminLoginPasswordClient, adminGetBuildingNumber } from "../libraries/HttpClient"
import { takeLatest, put, call } from "redux-saga/effects"
import { startLoading, finishLoading } from "./Loading"

export const ADMIN_LOGIN_PASSWORD = "admin.login.password"
const ADMIN_LOGIN_PASSWORD_SUCCESS = "admin.login.password_SUCCESS"
const ADMIN_LOGIN_PASSWORD_FAILED = "admin.login.password_FAILED"
export const ADMIN_LOGIN_RESET = "admin.login.reset"

export const adminLoginPassword = createAction(ADMIN_LOGIN_PASSWORD, user => user)
export const resetAdminLogin = createAction(ADMIN_LOGIN_RESET)

const adminLoginPasswordSaga = function*(action) {
    yield put(startLoading(ADMIN_LOGIN_PASSWORD))

    try {
        const response1 = yield call(adminLoginPasswordClient, action.payload)
        const response2 = yield call(adminGetBuildingNumber, response1.data.body.token)

        yield put({
            type: ADMIN_LOGIN_PASSWORD_SUCCESS,
            payload: response1.data,
            buildingNum: response2.data.body.data,
            meta: response1
        })
    } catch(ex) {
        yield put({
            type: ADMIN_LOGIN_PASSWORD_FAILED,
            payload: ex,
            error: true
        })
    }

    yield put(finishLoading(ADMIN_LOGIN_PASSWORD))
}

export function* adminLoginSaga() {
    yield takeLatest(ADMIN_LOGIN_PASSWORD, adminLoginPasswordSaga)
}

const initialState = {
    token: "",
    adminBuildingNumber: "",
    error: null
}

const adminLogin = handleActions({
    [ADMIN_LOGIN_PASSWORD_SUCCESS]: (state, action) => ({
        token: action.payload.body.token,
        error: null,
        adminBuildingNumber: action.buildingNum
    }),
    [ADMIN_LOGIN_PASSWORD_FAILED]: (state, action) => ({
        token: "",
        error: action.payload.response
    }),
    [ADMIN_LOGIN_RESET]: () => initialState
}, initialState)

export default adminLogin