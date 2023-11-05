import {
    FETCH_INTERVAL_DATA_BEGIN,
    FETCH_INTERVAL_DATA_FAILURE,
    FETCH_INTERVAL_DATA_SUCCESS
} from "../actions/openvolt-api-actions"

const initialState = {
    consumption_data: [],
    loading: false,
    error: null
}

export default function openVoltApiReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_INTERVAL_DATA_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_INTERVAL_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                consumption_data: action.payload?.data?.data
            }
        case FETCH_INTERVAL_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                consumption_data: []
            }
        default:
            return state
    }
}