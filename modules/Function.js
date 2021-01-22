import { put, call, takeLatest, all } from "redux-saga/effects"
import { startLoading, finishLoading } from "./Loading"

export function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`
    const FAILURE = `${type}_FAILED`

    return function*(action) {
        yield put(startLoading(type))

        try {
            const response = yield call(request, action.payload)
            yield put({
                type: SUCCESS,
                payload: response.data,
                meta: response
            })
        } catch(ex) {
            yield put({
                type: FAILURE,
                payload: ex,
                error: true
            })
        }

        yield put(finishLoading(type))
    }
}