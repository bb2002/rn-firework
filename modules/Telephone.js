import { createAction, handleActions } from "redux-actions"
import produce from "immer"
import { createRequestSaga } from "./Function"
import { getTelephoneListClient } from "../libraries/HttpClient"
import { takeLatest } from "redux-saga/effects"

const LOAD_TELEPHONE_LIST = "telephone.load"
const LOAD_TELEPHONE_LIST_SUCCESS = "telephone.load_SUCCESS"
const LOAD_TELEPHONE_LIST_FAILED = "telephone.load_FAILED"
const RESET_TELEPHONE_LIST = "telephone.reset"

export const loadTelephoneList = createAction(LOAD_TELEPHONE_LIST, beaconUUID => beaconUUID)
export const resetTelephoneList = createAction(RESET_TELEPHONE_LIST)

const getTelephoneListSaga = createRequestSaga(LOAD_TELEPHONE_LIST, getTelephoneListClient)
export function* telephoneSaga() {
    yield takeLatest(LOAD_TELEPHONE_LIST, getTelephoneListSaga)
}

const initialState = {
    tel: [],
    error: null
}

const telephone = handleActions({
    [LOAD_TELEPHONE_LIST_SUCCESS]: (state, { payload }) => ({
        tel: payload.body.data,
        error: null
    }),
    [LOAD_TELEPHONE_LIST_FAILED]: (state, { payload }) => ({
        tel: [],
        error: payload.response
    }),
    [RESET_TELEPHONE_LIST]: () => initialState
}, initialState)

export default telephone