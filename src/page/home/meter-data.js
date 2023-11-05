import {PaperBox} from "../../components/PaperBox";
import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField
} from "@mui/material";
import Container from "@mui/material/Container";

export const MeterData = (props) => {
    const getTableRows = () => {
        const generationMixRows = props.totalConsumptionData.generationMix ? Object.keys(props.totalConsumptionData.generationMix)?.map((key) => {
            const value = props.totalConsumptionData.generationMix[key]
            return {
                title: `Fuel ${key.toUpperCase()}`,
                value: value.toFixed(3) + '%'
            }
        }) : []

        const tableData = [
            {
                title: 'From',
                value: props.startDate?.toString()
            },
            {
                title: 'To',
                value: props.endDate?.toString()
            },
            {
                title: 'Total Consumption',
                value: props.totalConsumptionData?.totalConsumption + ' kWh'
            },
            {
                title: 'Total Carbon Emission',
                value: props.totalConsumptionData?.totalCarbonIntensity + ' gCO2eq'
            },
            ...generationMixRows
        ]
        return tableData.map((data, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>
                        <h3>{data.title} </h3>
                    </TableCell>
                    <TableCell>
                        {data.value}
                    </TableCell>
                </TableRow>
            )
        })
    }
    return (
        <PaperBox
            elevation={3}
            title={'Meter Data'}
            sx={{
                paddingY: '2vh',
            }}
        >
            <Container sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                gap: '10%',
            }}>
                <TextField
                    id="meter_id"
                    label="Meter Id"
                    value={props.meter_id}
                    disabled
                    sx={{
                        flexGrow: 2,
                    }}/>
                <Button
                    variant="contained"
                    sx={{
                        flexGrow: 1,
                    }}
                    onClick={props.getData}
                    disabled={props.loading}
                >
                    Get Data
                </Button>
            </Container>
            {
                props.loading ? <CircularProgress sx={{
                        marginTop: '2vh',
                    }}/>
                    : props.totalConsumptionData && <Container sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }}>
                    <Table size="small">
                        <TableBody>
                            {
                                getTableRows()
                            }
                        </TableBody>
                    </Table>
                </Container>

            }

        </PaperBox>
    )
}

MeterData.propTypes = {
    meter_id: PropTypes.string,
    getData: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    totalConsumptionData: PropTypes.object,
    loading: PropTypes.bool,
}