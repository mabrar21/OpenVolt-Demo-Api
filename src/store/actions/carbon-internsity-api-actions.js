import {getGenerationData, getIntensityData} from "../../api/carbon-intensity-api"

export const FETCH_CARBON_INTENSITY_DATA_BEGIN = 'FETCH_CARBON_INTENSITY_DATA_BEGIN'
export const FETCH_CARBON_INTENSITY_DATA_SUCCESS = 'FETCH_CARBON_INTENSITY_DATA_SUCCESS'
export const FETCH_CARBON_INTENSITY_DATA_FAILURE = 'FETCH_CARBON_INTENSITY_DATA_FAILURE'
export const FETCH_GENERATION_DATA_BEGIN = 'FETCH_GENERATION_DATA_BEGIN'
export const FETCH_GENERATION_DATA_SUCCESS = 'FETCH_GENERATION_DATA_SUCCESS'
export const FETCH_GENERATION_DATA_FAILURE = 'FETCH_GENERATION_DATA_FAILURE'

export const fetchCarbonIntensityDataBegin = () => ({
    type: FETCH_CARBON_INTENSITY_DATA_BEGIN
})
export const fetchCarbonIntensityDataSuccess = data => ({
    type: FETCH_CARBON_INTENSITY_DATA_SUCCESS,
    payload: {data}
})

export const fetchCarbonIntensityDataFailure = error => ({
    type: FETCH_CARBON_INTENSITY_DATA_FAILURE,
    payload: {error}
})

export const fetchGenerationDataBegin = () => ({
    type: FETCH_GENERATION_DATA_BEGIN
})
export const fetchGenerationDataSuccess = data => ({
    type: FETCH_GENERATION_DATA_SUCCESS,
    payload: {data}
})

export const fetchGenerationDataFailure = error => ({
    type: FETCH_GENERATION_DATA_FAILURE,
    payload: {error}
})

export const fetchCarbonIntensityData = (query) => {
    return dispatch => {
        dispatch(fetchCarbonIntensityDataBegin())
        return getIntensityData(query)
            .then(json => {
                dispatch(fetchCarbonIntensityDataSuccess(json.data))
                return json.data
            })
            .catch(error =>
                dispatch(fetchCarbonIntensityDataFailure(error))
            )
    }
}

export const fetchGenerationData = (query) => {
    return dispatch => {
        dispatch(fetchGenerationDataBegin())
        return getGenerationData(query)
            .then(json => {
                dispatch(fetchGenerationDataSuccess(json.data))
                return json.data
            })
            .catch(error =>
                dispatch(fetchGenerationDataFailure(error))
            )
    }
}