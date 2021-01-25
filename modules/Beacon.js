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
        const uuid = action.payload.uuid.replace(/\-/g, "").slice(0, 24)
        if(beaconName.startsWith("safe_")) {
            // 본 업체 비콘임을 확인 함.
            if(state.accuracy > action.payload.accuracy || !state.isBeaconDetected) {
                // 더 가까운 비콘을 탐색 함.
                return {
                    accuracy: action.payload.accuracy,
                    uuid: uuid,
                    major: action.payload.major,
                    minor: action.payload.minor,
                    isBeaconDetected: true
                }
            } else {
                if(state.uuid == uuid) {
                    // 현재 비콘 상태 업데이트
                    return {
                        ...state,
                        accuracy: action.payload.accuracy,
                        major: action.payload.major,
                        minor: action.payload.minor
                    }
                }

                return state
            }
        } else {
            // 우리 비콘이 아닌 경우
            return state
        }
    },
    [BEACON_NO_DETECTED]: (state, { payload }) => {
        const uuid = payload.beacon.uuid.replace(/\-/g, "").slice(0, 24)
        if(uuid === state.uuid) {
            // 현재 가장 가까웠던 비콘이 사라진 경우
            return initialState
        } else {
            // 알 수 없는 비콘이 사라진 경우
            return state
        }
    }
}, initialState)

export default beacon