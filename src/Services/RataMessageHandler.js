import updateStack from "../Redux/batch";
import {RataCompositionParser, RataTimeTableParser} from "./";
import store from "../Redux/store";
import {vehicleAdd} from "../Redux/actions";

export default function RataMessageHandler(data, url, instant = false) {

    /*const malliLocation = {
        trainNumber: 986,
        departureDate: "2021-01-21",
        timestamp: "2021-01-21T17:17:14.000Z",
        location: {
            type: "Point",
            coordinates: [
            24.871387,
            60.221993
        ]
    },
        speed: 74
    }*/

    /*const malliTrains = {
        trainNumber: 65,
        departureDate: "2021-01-21",
        operatorUICCode: 10,
        operatorShortCode: "vr",
        trainType: "IC",
        trainCategory: "Long-distance",
        commuterLineID: "",
        runningCurrently: true,
        cancelled: false,
        version: 276624618983,
        timetableType: "REGULAR",
        timetableAcceptanceDate: "2020-11-06T10:17:00.000Z",
        timeTableRows: [
            {
                "stationShortCode": "HKI",
                "stationUICCode": 1,
                "countryCode": "FI",
                "type": "DEPARTURE",
                "trainStopping": true,
                "commercialStop": true,
                "commercialTrack": "9",
                "cancelled": false,
                "scheduledTime": "2021-01-21T09:19:00.000Z",
                "actualTime": "2021-01-21T09:20:16.000Z",
                "differenceInMinutes": 1,
                "causes": [],
                "trainReady": {
                    "source": "KUPLA",
                    "accepted": true,
                    "timestamp": "2021-01-21T09:16:10.000Z"
                }
            },
            {
                "stationShortCode": "PSL",
                "stationUICCode": 10,
                "countryCode": "FI",
                "type": "ARRIVAL",
                "trainStopping": true,
                "commercialStop": true,
                "commercialTrack": "4",
                "cancelled": false,
                "scheduledTime": "2021-01-21T09:24:00.000Z",
                "actualTime": "2021-01-21T09:25:01.000Z",
                "differenceInMinutes": 1,
                "causes": []
            },
            {
                "stationShortCode": "PSL",
                "stationUICCode": 10,
                "countryCode": "FI",
                "type": "DEPARTURE",
                "trainStopping": true,
                "commercialStop": true,
                "commercialTrack": "4",
                "cancelled": false,
                "scheduledTime": "2021-01-21T09:25:00.000Z",
                "actualTime": "2021-01-21T09:26:13.000Z",
                "differenceInMinutes": 1,
                "causes": []
            },
            {
                "stationShortCode": "KÄP",
                "stationUICCode": 977,
                "countryCode": "FI",
                "type": "ARRIVAL",
                "trainStopping": false,
                "commercialTrack": "",
                "cancelled": false,
                "scheduledTime": "2021-01-21T09:27:00.000Z",
                "actualTime": "2021-01-21T09:28:19.000Z",
                "differenceInMinutes": 1,
                "causes": []
            },
            {
                "stationShortCode": "KÄP",
                "stationUICCode": 977,
                "countryCode": "FI",
                "type": "DEPARTURE",
                "trainStopping": false,
                "commercialTrack": "",
                "cancelled": false,
                "scheduledTime": "2021-01-21T09:27:00.000Z",
                "actualTime": "2021-01-21T09:28:19.000Z",
                "differenceInMinutes": 1,
                "causes": []
            },
            {
                "stationShortCode": "OL",
                "stationUICCode": 370,
                "countryCode": "FI",
                "type": "ARRIVAL",
                "trainStopping": true,
                "commercialStop": true,
                "commercialTrack": "1",
                "cancelled": false,
                "scheduledTime": "2021-01-21T17:56:00.000Z",
                "liveEstimateTime": "2021-01-21T17:55:08.000Z",
                "estimateSource": "COMBOCALC",
                "differenceInMinutes": 0,
                "causes": []
            }
        ]
    }*/

    /*const malliComposition = {
        "trainNumber": 65,
        "departureDate": "2021-01-23",
        "operatorUICCode": 10,
        "operatorShortCode": "vr",
        "trainCategory": "Long-distance",
        "trainType": "IC",
        "version": 276647464083,
        "journeySections": [
            {
                "beginTimeTableRow": {
                    "stationShortCode": "HKI",
                    "stationUICCode": 1,
                    "countryCode": "FI",
                    "type": "DEPARTURE",
                    "scheduledTime": "2021-01-23T09:19:00.000Z"
                },
                "endTimeTableRow": {
                    "stationShortCode": "KV",
                    "stationUICCode": 480,
                    "countryCode": "FI",
                    "type": "ARRIVAL",
                    "scheduledTime": "2021-01-23T10:45:00.000Z"
                },
                "locomotives": [
                    {
                        "location": 1,
                        "locomotiveType": "Sr2",
                        "powerType": "Electric"
                    }
                ],
                "wagons": [
                    {
                        "wagonType": "Ed",
                        "location": 2,
                        "salesNumber": 5,
                        "length": 2640
                    },
                    {
                        "wagonType": "Eds",
                        "location": 3,
                        "salesNumber": 4,
                        "length": 2640,
                        "playground": true,
                        "disabled": true
                    },
                    {
                        "wagonType": "ERd",
                        "location": 4,
                        "salesNumber": 3,
                        "length": 2640,
                        "catering": true
                    },
                    {
                        "wagonType": "Edb",
                        "location": 5,
                        "salesNumber": 2,
                        "length": 2640
                    },
                    {
                        "wagonType": "Edo",
                        "location": 6,
                        "salesNumber": 1,
                        "length": 2740,
                        "pet": true
                    }
                ],
                "totalLength": 152,
                "maximumSpeed": 200,
                "attapId": 73535179,
                "saapAttapId": 73535244
            },
            {
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
            }
        ]
    }*/

    if (!url) {
        return null
    }

    try {

        switch (url.split("/")[0]) {
            case "composition":
                const compositionPayload = {
                    id: data.trainNumber,
                    displayName: data.trainNumber,
                    vehicleType: `Rata/${data.trainCategory}`,
                    api: "Rata",
                    coordinates: [null, null],
                    content: {
                        composition: RataCompositionParser(data.journeySections)
                    }
                }
                /*if (times < 10) {
                    console.log(RataCompositionParser(data.journeySections))
                    times++
                }*/
                store.dispatch(vehicleAdd(compositionPayload.id, compositionPayload.displayName, compositionPayload.vehicleType, compositionPayload.api, compositionPayload.coordinates, compositionPayload.content));
                break
            case "trains":
                let trainsPayload = {
                    id: data.trainNumber,
                    displayName: data.trainNumber,
                    vehicleType: `Rata/${data.trainCategory}`,
                    api: "Rata",
                    coordinates: [null, null],
                    content: {
                        trainMessageRec: true,
                        operatorUICCode: data.operatorUICCode,
                        operatorShortCode: data.operatorShortCode,
                        type: data.trainType,
                        category: data.trainCategory,
                        ...(data.commuterLineID) && {commuterLineId: data.commuterLineID}, //Voi olla tyhjä
                        running: data.runningCurrently,
                        version: data.version,
                        departureDate: data.departureDate,
                        timetableType: data.timetableType,
                        timetableRows: RataTimeTableParser(data.timeTableRows)
                    }
                }

                if (instant) {
                    store.dispatch(vehicleAdd(trainsPayload.id, trainsPayload.displayName, trainsPayload.vehicleType, trainsPayload.api, trainsPayload.coordinates, trainsPayload.content));
                } else {
                    updateStack.addUpdate = trainsPayload;
                }

                break
            case "train-locations":

                updateStack.addUpdate = {
                    id: data.trainNumber,
                    displayName: data.trainNumber,
                    vehicleType: "Rata/",
                    api: "Rata",
                    coordinates: [data.location.coordinates[0], data.location.coordinates[1]],
                    content: {
                        speed: data.speed
                    }
                };

                break
            default:
                console.log(url.split("/")[0])
                break
        }
    } catch (e) {
        console.log(e)
    }

    /*updateStack.addUpdate = {
        id: data.trainNumber,
        displayName: data.trainNumber,
        vehicleType: "Rata/",
        api: "Rata",
        coordinates: [data.location.coordinates[0], data.location.coordinates[1]],
        content: {
            ...(data.speed) && {speed: data.speed}
        }
    };*/
}