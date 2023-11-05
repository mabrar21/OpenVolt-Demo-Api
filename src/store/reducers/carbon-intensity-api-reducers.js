import {
    FETCH_CARBON_INTENSITY_DATA_BEGIN,
    FETCH_CARBON_INTENSITY_DATA_FAILURE,
    FETCH_CARBON_INTENSITY_DATA_SUCCESS,
    FETCH_GENERATION_DATA_BEGIN,
    FETCH_GENERATION_DATA_FAILURE,
    FETCH_GENERATION_DATA_SUCCESS
} from "../actions/carbon-internsity-api-actions"

const INITIAL_STATE = {
    carbon_intensity: [],
    generation_data: [],
    loading: false,
    error: null
}

export default function carbonIntensityApiReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_CARBON_INTENSITY_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_CARBON_INTENSITY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                carbon_intensity: action.payload?.data?.data
            }
        case FETCH_CARBON_INTENSITY_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                carbon_intensity: null
            }
        case FETCH_GENERATION_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_GENERATION_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                generation_data: action.payload?.data?.data
            }
        case FETCH_GENERATION_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                generation_data: null
            }
        default:
            return state
    }
}