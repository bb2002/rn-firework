import { createAction, handleActions } from "redux-actions"
import produce from "immer"
import { adminLoginPasswordClient } from "../libraries/HttpClient"
import { createRequestSaga } from "./Function"
import { takeLatest } from "redux-saga/effects"

export const ADMIN_LOGIN_PASSWORD = "admin.login.password"
const ADMIN_LOGIN_PASSWORD_SUCCESS = "admin.login.password_SUCCESS"
const ADMIN_LOGIN_PASSWORD_FAILED = "admin.login.password_FAILED"
export const ADMIN_LOGIN_RESET = "admin.login.reset"

export const adminLoginPassword = createAction(ADMIN_LOGIN_PASSWORD, user => user)
export const resetAdminLogin = createAction(ADMIN_LOGIN_RESET)

const adminLoginPasswordSaga = createRequestSaga(ADMIN_LOGIN_PASSWORD, adminLoginPasswordClient)
export function* adminLoginSaga() {
    yield takeLatest(ADMIN_LOGIN_PASSWORD, adminLoginPasswordSaga)
}

const initialState = {
    token: "",
    error: null
}

const adminLogin = handleActions({
    [ADMIN_LOGIN_PASSWORD_SUCCESS]: (state, action) => ({
        token: "jwt token save here.",
        error: null
    }),
    [ADMIN_LOGIN_PASSWORD_FAILED]: (state, action) => ({
        token: "",
        error: action.payload.response
    }),
    [ADMIN_LOGIN_RESET]: () => initialState
}, initialState)

export default adminLogin