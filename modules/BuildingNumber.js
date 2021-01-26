import { createAction, handleActions } from "redux-actions"
import produce from "immer"
import { createRequestSaga } from "./Function"
import { getBuildingNumberClient } from "../libraries/HttpClient"
import { takeLatest } from "redux-saga/effects"

const LOAD_BUILDING_NUMBER = "buildnum.load"
const LOAD_BUILDING_NUMBER_SUCCESS = "buildnum.load_SUCCESS"
const LOAD_BUILDING_NUMBER_FAILED = "buildnum.load_FAILED"
const RESET_BUILDING_NUMBER = "buildnum.reset"

export const loadBuildingNumber = createAction(LOAD_BUILDING_NUMBER, uuid => uuid)
export const resetBuildingNumber = createAction(RESET_BUILDING_NUMBER)

const loadBuildingNumberSaga = createRequestSaga(LOAD_BUILDING_NUMBER, getBuildingNumberClient)
export function* buildingNumberSaga() {
    yield takeLatest(LOAD_BUILDING_NUMBER, loadBuildingNumberSaga)
}

const initialState = {
    buildingNumber: "",
    error: null
}

const buildingNumber = handleActions({
    [LOAD_BUILDING_NUMBER_SUCCESS]: (state, { payload }) => ({
        buildingNumber: payload.body.data,
        error: null
    }),
    [LOAD_BUILDING_NUMBER_FAILED]: (state, { payload }) => ({
        buildingNumber: "",
        error: payload.response
    }),
    [RESET_BUILDING_NUMBER]: () => initialState,
}, initialState)

export default buildingNumber