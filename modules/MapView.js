import { createAction, handleActions } from "redux-actions"
import produce from "immer"
import { createRequestSaga } from "./Function"
import { getEscapeMapClient } from "../libraries/HttpClient"
import { takeLatest } from "redux-saga/effects"
import { HttpClientConfig } from "../libraries/Config"

const LOAD_ESCAPE_MAP = "mapview.load"
const LOAD_ESCAPE_MAP_SUCCESS = "mapview.load_SUCCESS"
const LOAD_ESCAPE_MAP_FAILED = "mapview.load_FAILED"
const NO_ESCAPE_MAP = "mapview.nomap"

export const loadEscapeMap = createAction(LOAD_ESCAPE_MAP, beacon => beacon)
export const noEscapeMap = createAction(NO_ESCAPE_MAP)

const loadEscapeMapSaga = createRequestSaga(LOAD_ESCAPE_MAP, getEscapeMapClient)
export function* mapViewSaga() {
    yield takeLatest(LOAD_ESCAPE_MAP, loadEscapeMapSaga)
}

const initialState = {
    mapURL: `${HttpClientConfig.WEB_SERVER_ADDRESS}/safe_no_map`,
    buildingNumber: "",
    postCode: "",
    isExitPoint: false,
    detailAddress: ""
}

const mapView = handleActions({
    [LOAD_ESCAPE_MAP_SUCCESS]: (state, { payload }) => {

        if(!payload.body.data.imageURL) {
            // 비콘은 있지만, 도면 정보가 없는 경우
            return initialState
        }

        return {
            mapURL: payload.body.data.imageURL,
            buildingNumber: payload.body.data.buildingNumber,
            postCode: payload.body.data.postCode,
            isExitPoint: payload.body.data.isExitPoint,
            detailAddress: payload.body.data.detailedAddress
        }
    },
    [LOAD_ESCAPE_MAP_FAILED]: () => initialState,
    [NO_ESCAPE_MAP]: () => (
        {
            ...initialState,
            mapURL: `${HttpClientConfig.WEB_SERVER_ADDRESS}/safe_no_beacon`
        }
    ),
    
}, initialState)

export default mapView