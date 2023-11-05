import React, {useCallback, useEffect, useState} from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {PaperBox} from "../../components/PaperBox";
import {MeterData} from "./meter-data";
import {useDispatch, useSelector} from "react-redux";
import {fetchIntervalData} from "../../store/actions/openvolt-api-actions";
import {getTotalConsumptionData} from "../../utils/calculator";
import {fetchCarbonIntensityData, fetchGenerationData} from "../../store/actions/carbon-internsity-api-actions";
import moment from "moment";

export const Home = () => {
    const dispatch = useDispatch()
    const meterId = '6514167223e3d1424bf82742'
    const startDate = moment('2023-01-01T00:00:00Z')
    const endDate = moment('2023-01-31T12:59:59Z')
    const consumptionData = useSelector(state => state.openVoltData.consumption_data);
    const carbonIntensityData = useSelector(state => state.carbonIntensityData.carbon_intensity);
    const generationData = useSelector(state => state.carbonIntensityData.generation_data);
    const memoizedValue = useCallback(() => getTotalConsumptionData(consumptionData, carbonIntensityData, generationData),
        [consumptionData, carbonIntensityData, generationData]);
    const [totalConsumptionData, setTotalConsumptionData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            return await memoizedValue()
        }

        fetchData().then((data) => {
            setTotalConsumptionData(data)
            if(data) {
                setLoading(false)
            }
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [memoizedValue])

    const getConsumptionData = () => {
        setLoading(true)
        dispatch(fetchCarbonIntensityData({
            from: startDate.toISOString(),
            to: endDate.toISOString(),
        }))
        dispatch(fetchGenerationData({
            from: startDate.toISOString(),
            to: endDate.toISOString(),
        }))
        dispatch(fetchIntervalData(
            {
                meter_id: meterId,
                start_date: startDate.format('YYYY-MM-DD'),
                end_date: endDate.format('YYYY-MM-DD'),
                granularity: 'hh'
            }
        ))
    }

    return (
        <Container
            style={{
                paddingTop: '4vh',
            }}>
            <Box>
                <PaperBox
                    elevation={3}
                    title={'Openvolt API Demo'}
                />
                <MeterData
                    meter_id={meterId}
                    getData={getConsumptionData}
                    startDate={startDate}
                    endDate={endDate}
                    totalConsumptionData={totalConsumptionData}
                    loading={loading}
                />
            </Box>
        </Container>
    )
}