import axios from "axios";

export const getIntensityData = (query) => {
    return axios.get(`https://api.carbonintensity.org.uk/intensity/${query.from}/${query.to}`);
};

export const getGenerationData = (query) => {
    return axios.get(`https://api.carbonintensity.org.uk/generation/${query.from}/${query.to}`);
};