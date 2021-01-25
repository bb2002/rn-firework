import { createAction, handleActions } from "redux-actions"
import { createRequestSaga } from "./Function"
import { getBuildingMainPage } from "../libraries/HttpClient"
import { takeLatest } from "redux-saga/effects"
import { HttpClientConfig } from "../libraries/Config"

const LOAD_BUILDING_MAIN_PAGE = "buildingpage.load"
const NO_BEACON_MAIN_PAGE = "buildpage.nobeacon"
const LOAD_BUILDING_MAIN_PAGE_SUCCESS = "buildingpage.load_SUCCESS"
const LOAD_BUILDING_MAIN_PAGE_FAILED = "buildingpage.load_FAILED"

export const loadBuildingMainPage = createAction(LOAD_BUILDING_MAIN_PAGE, beacon => beacon)
export const noBeaconMainPage = createAction(NO_BEACON_MAIN_PAGE)

const loadBuildingMainPageSaga = createRequestSaga(LOAD_BUILDING_MAIN_PAGE, getBuildingMainPage)
export function* buildingMainPageSaga() {
    yield takeLatest(LOAD_BUILDING_MAIN_PAGE, loadBuildingMainPageSaga)
}

const initialState = {
    buildingNumber: "",
    url: `${HttpClientConfig.WEB_SERVER_ADDRESS}/safe_no_beacon`
}

const buildingMainPage = handleActions({
    [LOAD_BUILDING_MAIN_PAGE_SUCCESS]: (state, { payload }) => {
        if(payload.body.data === null) {
            // 건물에 대한 detail 페이지가 없는 경우
            return {
                buildingNumber: "",
                url: `${HttpClientConfig.WEB_SERVER_ADDRESS}/safe_no_info`
            }
        } else {
            // 건물에 대한 detail 페이지가 있는 경우
            return {
                buildingNumber: payload.body.data.buildingNumber,
                url: payload.body.data.imageURL
            }
        }

        },
    [LOAD_BUILDING_MAIN_PAGE_FAILED]: (state, { payload }) => ({
        // 등록되지 않은 비콘인 경우
        buildingNumber: "",
        url: `${HttpClientConfig.WEB_SERVER_ADDRESS}/safe_no_info`
    }),
    [NO_BEACON_MAIN_PAGE]: () => initialState
}, initialState)

export default buildingMainPage
