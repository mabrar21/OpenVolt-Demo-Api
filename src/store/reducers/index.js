import {combineReducers} from "redux";
import openVoltApiReducer from "./openvolt-api-reducers";
import carbonIntensityApiReducer from "./carbon-intensity-api-reducers";


const rootReducer = combineReducers({
    openVoltData: openVoltApiReducer,
    carbonIntensityData: carbonIntensityApiReducer
});

export default rootReducer;