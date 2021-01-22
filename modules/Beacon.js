import { createAction, handleActions } from "redux-actions"

const NEW_BEACON_DETECTED = "beacon.foundnew"
const BEACON_NO_DETECTED = "beacon.empty"

export const newBeaconDetected = createAction(NEW_BEACON_DETECTED, data => data)
export const noBeaconDetected = createAction(BEACON_NO_DETECTED)

const initialState = {
    accuracy: 0.0,
    uuid: "",
    major: 0,
    minor: 0,
    isBeaconDetected: false
}

const beacon = handleActions({
    [NEW_BEACON_DETECTED]: (state, action) => {
        const beaconName = action.payload.name
        if(beaconName.startsWith("safe_")) {
            // 본 업체 비콘임을 확인 함.
            if(state.accuracy < action.payload.accuracy) {
                // 더 가까운 비콘을 탐색 함.
                return {
                    accuracy: action.payload.accuracy,
                    uuid: action.payload.uuid,
                    major: action.payload.major,
                    minor: action.payload.minor,
                    isBeaconDetected: true
                }
            } else {
                return state
            }
        } else {
            // 우리 비콘이 아닌 경우
            return state
        }
    },
    [BEACON_NO_DETECTED]: (state) => state
}, initialState)

export default beacon