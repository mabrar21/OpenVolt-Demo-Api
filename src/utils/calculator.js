import moment from "moment";

export const getTotalConsumptionData = (openVoltData, intensityData, generationData) => {
    if(!openVoltData || !intensityData
        || !openVoltData.length || !intensityData.length
        || !generationData || !generationData.length) {
        return null
    }

    const openVoltDataIndexedByDate = openVoltData.reduce((acc, dataElement) => {
        const dateInterval = moment(dataElement.start_interval).toString()

        acc[dateInterval] = dataElement
        return acc;
    }, {});

    intensityData.forEach((dataElement) => {
        const formatString = 'YYYY-MM-DDTHH:mmZ'
        const dateInterval = moment(dataElement.from, formatString).toString()
        if (openVoltDataIndexedByDate[dateInterval]) {
            openVoltDataIndexedByDate[dateInterval].carbon_intensity = dataElement
        }
    });
    generationData.forEach((dataElement) => {
        const formatString = 'YYYY-MM-DDTHH:mmZ'
        const dateInterval = moment(dataElement.from, formatString).toString()
        if (openVoltDataIndexedByDate[dateInterval]) {
            openVoltDataIndexedByDate[dateInterval].generation_mix = dataElement.generationmix
        }
    });

    const totalConsumption = Object.values(openVoltDataIndexedByDate).reduce((acc, dataElement) => {
        acc.totalConsumption += parseInt(dataElement.consumption)
        acc.totalCarbonIntensity += dataElement.carbon_intensity.intensity.actual
        dataElement.generation_mix.forEach((generationMixElement) => {
            if (acc.generationMix[generationMixElement.fuel]) {
                acc.generationMix[generationMixElement.fuel] += parseInt(generationMixElement.perc)
            } else {
                acc.generationMix[generationMixElement.fuel] = parseInt(generationMixElement.perc)
            }
        })

        return acc
    }, {
        totalConsumption: 0,
        totalCarbonIntensity: 0,
        generationMix: {}
    })

    // calculate total generation mix percentage
    const totalGenerationMix = Object.values(totalConsumption.generationMix).reduce((acc, dataElement) => {
        acc += dataElement
        return acc
    }, 0)

    // calculate total generation mix percentage
    totalConsumption.generationMix = Object.keys(totalConsumption.generationMix).reduce((acc, dataElement) => {
        acc[dataElement] = (totalConsumption.generationMix[dataElement] / totalGenerationMix) * 100
        return acc
    }, {})

    return totalConsumption

}