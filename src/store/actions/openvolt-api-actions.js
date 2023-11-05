import {getIntervalData} from "../../api/open-volt-api"

export const FETCH_INTERVAL_DATA_BEGIN = 'FETCH_INTERVAL_DATA_BEGIN'
export const FETCH_INTERVAL_DATA_SUCCESS = 'FETCH_INTERVAL_DATA_SUCCESS'
export const FETCH_INTERVAL_DATA_FAILURE = 'FETCH_INTERVAL_DATA_FAILURE'

export const fetchDataBegin = () => ({
    type: FETCH_INTERVAL_DATA_BEGIN
})

export const fetchDataSuccess = data => ({
    type: FETCH_INTERVAL_DATA_SUCCESS,
    payload: { data }
})

export const fetchDataFailure = error => ({
    type: FETCH_INTERVAL_DATA_FAILURE,
    payload: { error }
})

export const fetchIntervalData = (query) => {
    return dispatch => {
        dispatch(fetchDataBegin())
        return getIntervalData(query)
            .then(json => {
                dispatch(fetchDataSuccess(json.data))
                return json.data
            })
            .catch(error =>
                dispatch(fetchDataFailure(error))
            )
    }
}