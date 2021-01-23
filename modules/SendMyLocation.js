import { createAction, handleActions } from "redux-actions"
import produce from "immer"
import { createRequestSaga } from "./Function"
import { sendMyLocationClient } from "../libraries/HttpClient"
import { takeLatest } from "redux-saga/effects"

const TOGGLE_SEND_MY_LOCATION = "sendlocation.toggle"
const SEND_MY_LOCATION = "sendlocation.send"
const SEND_MY_LOCATION_SUCCESS = "sendlocation.send_SUCCESS"
const SEND_MY_LOCATION_FAILED = "sendlocation.send_FAILED"

export const toggleSendMyLocation = createAction(TOGGLE_SEND_MY_LOCATION)
export const sendCurrentLocation = createAction(SEND_MY_LOCATION, data => data)

const sendSaga = createRequestSaga(SEND_MY_LOCATION, sendMyLocationClient)

export function* sendMyLocationSaga() {
    yield takeLatest(SEND_MY_LOCATION, sendSaga)
}

const initialState = {
    isSending: false,
    error: null
}

const sendMyLocation = handleActions({
    [TOGGLE_SEND_MY_LOCATION]: (state, action) => produce(state, draft => {
        draft.isSending = !draft.isSending
    }),
    [SEND_MY_LOCATION_SUCCESS]: (state, action) => produce(state, draft => {
        draft.error = null
    }),
    [SEND_MY_LOCATION_FAILED]: (state, action) => produce(state, draft => {
        draft.error = action.payload.response
    })
}, initialState)

export default sendMyLocation