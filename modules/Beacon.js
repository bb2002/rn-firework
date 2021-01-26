import { createAction, handleActions } from "redux-actions"
import produce from "immer"

const BEACON_APPEARED       = "beacon.appeared"
const BEACON_UPDATED        = "beacon.updated"
const BEACON_DISAPPEARED    = "beacon.disappeared"

export const beaconAppeared = createAction(BEACON_APPEARED, beacon => beacon)
export const beaconUpdated = createAction(BEACON_UPDATED, beacons => beacons)
export const beaconDisappeared = createAction(BEACON_DISAPPEARED, beacon => beacon)

const initialState = {
    detectedBeacons: [],
    uuid: "",
    uuidOriginal: "",
    major: 0,
    minor: 0,
    isBeaconDetected: false
}

const beacon = handleActions({
    [BEACON_APPEARED]: (state, { payload }) => produce(state, draft => {
        if(payload.name.startsWith("safe_")) {
            for(let i = 0; i < state.detectedBeacons.length; ++i) {
                if(draft.detectedBeacons[i].uuid === payload.uuid) {
                    return state
                }
            }

            draft.detectedBeacons.push(payload)
            draft.isBeaconDetected = true

            draft = updateNearBeacon(draft)
        }
    }),
    [BEACON_UPDATED]: (state, { payload }) => produce(state, draft => {
        /**
         * 새로 업데이트 된 비콘을 업데이트 합니다.
         */
        for(let j = 0; j < payload.length; ++j) {
            const beacon = payload[j]

            for(let i = 0; i < draft.detectedBeacons.length; ++i) {
                const dBeaconUUID = draft.detectedBeacons[i].uuid

                if(beacon.uuid === dBeaconUUID) {
                    // 비콘 값 업데이트
                    draft.detectedBeacons[i] = beacon
                }
            }
        }

        draft = updateNearBeacon(draft)
    }),
    [BEACON_DISAPPEARED]: (state, { payload }) => produce(state, draft => {
        payload = payload.beacon

        const searched = draft.detectedBeacons.findIndex(beacon => beacon.uuid === payload.uuid)
        if(searched > -1) {
            draft.detectedBeacons.splice(searched, 1)
            draft = updateNearBeacon(draft)
        }
    })
}, initialState)

function updateNearBeacon(draft) {
    if(draft.detectedBeacons.length === 0) {
        draft.uuid = ""
        draft.major = 0
        draft.minor = 0
        draft.uuidOriginal = ""
        draft.isBeaconDetected = false
        return draft
    }

    /**
     * 거리순으로 비콘을 정렬합니다.
     */
    draft.detectedBeacons.sort((lts, rts) => {
        return lts.accuracy - rts.accuracy
    })

    // 첫번째 비콘이 가장 가까운 비콘 입니다.
    draft.uuid = draft.detectedBeacons[0].uuid.replace(/\-/g, "").slice(0, 24)
    draft.uuidOriginal = draft.detectedBeacons[0].uuid
    draft.major = draft.detectedBeacons[0].major
    draft.minor = draft.detectedBeacons[0].minor

    return draft
}

export default beacon