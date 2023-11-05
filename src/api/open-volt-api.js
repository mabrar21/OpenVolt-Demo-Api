import axios from 'axios';

const getToken = () => {
    const token ='test-Z9EB05N-07FMA5B-PYFEE46-X4ECYAR';

    return token.trim();
};

export const getIntervalData = (query) => {
    const token = getToken();
    return axios.get('https://api.openvolt.com/v1/interval-data', {
        headers: { 'x-api-key': `${token}` },
        params: query
    });
};