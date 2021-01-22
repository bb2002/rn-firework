import { createAction, handleActions } from "redux-actions"
import produce from "immer"

const SCREEN_OF_INTRO = "screen.intro"
const SCREEN_OF_USER = "screen.user"
const SCREEN_OF_ADMIN = "screen.admin"

const ESCAPEHELPER_OF_MAPVIEW = "eschelper.mapview"
const ESCAPEHELPER_OF_CALLROOM = "eschelper.callroom"
const ESCAPEHELPER_OF_SENDLOCATION = "eschelper.sendlocation"

export const screenOfIntro = createAction(SCREEN_OF_INTRO)
export const screenOfUser = createAction(SCREEN_OF_USER)
export const screenOfAdmin = createAction(SCREEN_OF_ADMIN)

export const escHelperMapView = createAction(ESCAPEHELPER_OF_MAPVIEW)
export const escHelperCallRoom = createAction(ESCAPEHELPER_OF_CALLROOM)
export const escHelperSendLocation = createAction(ESCAPEHELPER_OF_SENDLOCATION)

const initialState = {
    screen: "intro",
    escHelper: "mapview"
}

const screenMode = handleActions({
    [SCREEN_OF_INTRO]: (state) => produce(state, draft => {
        draft.screen = "intro"
    }),
    [SCREEN_OF_USER]: (state) => produce(state, draft => {
        draft.screen = "user"
    }),
    [SCREEN_OF_ADMIN]: (state) => produce(state, draft => {
        draft.screen = "admin"
    }),
    [ESCAPEHELPER_OF_MAPVIEW]: (state) => produce(state, draft => {
        draft.escHelper = "mapview"
    }),
    [ESCAPEHELPER_OF_CALLROOM]: (state) => produce(state, draft => {
        draft.escHelper = "callroom"
    }),
    [ESCAPEHELPER_OF_SENDLOCATION]: (state) => produce(state, draft => {
        draft.escHelper = "sendlocation"
    }),
}, initialState)

export default screenMode