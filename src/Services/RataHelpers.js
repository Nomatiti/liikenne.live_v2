import store from "../Redux/store";

export function RataTimeTableParser(timetable = []) {
    let output = [];
    let lastIndex = -1;
    timetable.forEach((item, index) => {

        let type = "arr";
        if (item.type === "DEPARTURE") {
            type = "dep"
        }

        if (lastIndex !== -1 && type === "dep") {
            if (item.stationUICCode === output[lastIndex].stationUICCode) {
                output[lastIndex].dep = {
                    schedTime: new Date(item.scheduledTime),
                    actTime: item.actualTime ? new Date(item.actualTime) : null, //Voi olla tyhjä
                    timeDiff: item.differenceInMinutes ? item.differenceInMinutes : null, //Voi olla tyhjä
                    liveEstimateTime: item.liveEstimateTime ? new Date(item.liveEstimateTime) : null //Voi olla tyhjä
                }
            }
        } else {
            output.push({
                stationShortCode: item.stationShortCode,
                stationUICCode: item.stationUICCode,
                country: item.countryCode,
                stopping: item.trainStopping,
                commercialStop: item.commercialStop,
                track: item.commercialTrack,
                cancelled: item.cancelled,
                causes: item.causes,
                trainReady: item.trainReady,
                [type]: {
                    schedTime: new Date(item.scheduledTime),
                    actTime: item.actualTime ? new Date(item.actualTime) : null, //Voi olla tyhjä
                    timeDiff: item.differenceInMinutes ? item.differenceInMinutes : null, //Voi olla tyhjä
                    liveEstimateTime: item.liveEstimateTime ? new Date(item.liveEstimateTime) : null //Voi olla tyhjä
                }
            })
            lastIndex++
        }
    })
    return output
}

export function RataStations(UICCode, shortName = "virhe") {
    let Store = store.getState()
    let name = Store.Constants.stationUICCodes[UICCode]

    if (name) {
        return name.name
    } else {
        return shortName
    }
}

export function RataOperators(UICCode) {
    return UICCode + "+"
}

export function RataToFrom(timetable = []) {
    if (timetable.length > 0) {
        const last = timetable[timetable.length - 1]
        return `${RataStations(timetable[0].stationUICCode, timetable[0].stationShortCode)} - ${RataStations(last.stationUICCode, last.stationShortCode)}`
    } else {
        return null
    }
}

export function RataTypes(type) {
    switch (type) {
        case "Long-distance":
            return "Kaukojuna"
        case "Commuter":
            return "Lähijuna"
        case "Cargo":
            return "Tavarajuna"
        case "Locomotive":
            return "Veturi"
        case "Test drive":
            return "Testiajo"
        case "On-track machines":
            return "Työkone"
        case "Shunting":
            return "Shunting"
        default:
            return type
    }
}

export function RataCompositionParser(sections) {
    /*const malli = [{
        "beginTimeTableRow": {
            "stationShortCode": "KV",
            "stationUICCode": 480,
            "countryCode": "FI",
            "type": "DEPARTURE",
            "scheduledTime": "2021-01-23T11:03:00.000Z"
        },
        "endTimeTableRow": {
            "stationShortCode": "OL",
            "stationUICCode": 370,
            "countryCode": "FI",
            "type": "ARRIVAL",
            "scheduledTime": "2021-01-23T17:56:00.000Z"
        },
        "locomotives": [
            {
                "location": 6,
                "locomotiveType": "Sr2",
                "powerType": "Electric"
            }
        ],
        "wagons": [
            {
                "wagonType": "Edo",
                "location": 1,
                "salesNumber": 1,
                "length": 2740,
                "pet": true
            },
            {
                "wagonType": "Edb",
                "location": 2,
                "salesNumber": 2,
                "length": 2640
            },
            {
                "wagonType": "ERd",
                "location": 3,
                "salesNumber": 3,
                "length": 2640,
                "catering": true
            },
            {
                "wagonType": "Eds",
                "location": 4,
                "salesNumber": 4,
                "length": 2640,
                "playground": true,
                "disabled": true
            },
            {
                "wagonType": "Ed",
                "location": 5,
                "salesNumber": 5,
                "length": 2640
            }
        ],
        "totalLength": 152,
        "maximumSpeed": 160,
        "attapId": 73535245,
        "saapAttapId": 73535364
    }]*/

    let output = []

    sections.forEach(sectionData => {
        const sectionParsed = section(sectionData)
        if (sectionParsed) {
            output.push(sectionParsed)
        }
    })

    return output
}

function section(section) {
    let comp = []

    section.locomotives.forEach(locomotive => {
        comp[locomotive.location -1] = {
            type: locomotive.locomotiveType,
            powerType: locomotive.powerType
        }
    })

    section.wagons.forEach(wagon => {
        comp[wagon.location -1] = {
            type: wagon.wagonType,
            salesNumber: wagon.salesNumber,
            pet: !!wagon.pet,
            catering: !!wagon.catering,
            video: !!wagon.video,
            luggage: !!wagon.luggage,
            smoking: !!wagon.smoking,
            disabled: !!wagon.disabled
        }
    })

    return {
        begin: section.beginTimeTableRow.stationShortCode,
        beginUICCOde: section.beginTimeTableRow.stationUICCode,
        end: section.endTimeTableRow.stationShortCode,
        endUICCode: section.endTimeTableRow.stationUICCode,
        length: section.totalLength,
        maxSpeed: section.maximumSpeed,
        composition: comp
    }
}

export function RataStationUICCodeParse(data) {
    let output = {}

    data.forEach(station =>{
        output[station.stationUICCode] = {
            passangerTraffic: station.passangerTraffic,
            type: station.type,
            name: station.stationName,
            coordinates: [station.longitude, station.latitude]
        }
    })

    return output
}

export function RataOperatorUICCodeParse(data) {
    let output = {}

    data.forEach(operator =>{
        output[operator.id] = {
            name: operator.operatorName
        }
    })

    return output
}