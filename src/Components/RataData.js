import React, { useState, useEffect } from 'react';
import {Databox, DataLine, RataCompositionTable, RataTimetable} from "./";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrain} from "@fortawesome/free-solid-svg-icons";
import {colorTheme, getContrastYIQ} from "../Styling";
import {RataMessageHandler, RataStations, RataToFrom, RataTypes} from "../Services";

export default function RataData(props) {
    const {displayName, vehicleType, content = {}} = props.Vehicle;
    const {
        trainMessageRec, //Tells if train-type message is received
        speed,
        operatorShortCode,
        type,
        category,
        commuterLineId,
        timetableRows,
        composition,
        departureDate
    } = content;

    const [trainCall, setTrainCall] = useState(false)
    const [compositionCall, setCompositionCall] = useState(false)
    const [callId, setCallId] = useState(displayName)

    useEffect(() => {
        if (callId !== displayName) {
            setTrainCall(false)
            setCompositionCall(false)
        }
        if (callId !== displayName || (!composition && trainMessageRec === true && !compositionCall)) {
            setCallId(displayName)

            if (!trainMessageRec && !trainCall) {
                setTrainCall(true)
                console.log("Initialized train api call for train id:" + displayName)
                fetch(`https://rata.digitraffic.fi/api/v1/trains/latest/${displayName}`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setTrainCall(false)
                            RataMessageHandler(result[0], "trains/", true)
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            setTrainCall(false)
                            console.log(error)
                        }
                    )
            }
            if (!composition && trainMessageRec === true && !compositionCall) {
                setCompositionCall(true)
                console.log("Initialized composition api call for train id:" + displayName)
                fetch(`https://rata.digitraffic.fi/api/v1/compositions/${departureDate}/${displayName}`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            //setCompositionCall(true)
                            if (result.trainNumber) {
                                RataMessageHandler(result, "composition/")
                            } else {
                                if (result.code && result.code !=="COMPOSITION_NOT_FOUND") {
                                    //TODO: log to aws
                                    console.log(result);
                                } else if (!result.code) {
                                    //TODO: log to aws
                                    console.log(result);
                                }
                            }
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            setCompositionCall(false)
                            console.log(error)
                        }
                    )
            }
        }
    }, [props.Vehicle])

    const Otsikko = <><FontAwesomeIcon icon={faTrain}/> {type ? type : null}{displayName}</>

    return (
        <>
            <Databox header={Otsikko} color={colorTheme[vehicleType]}
                     textColor={getContrastYIQ(colorTheme[vehicleType])}
            >
                {RataToFrom(timetableRows) ? <h3>{RataToFrom(timetableRows)}</h3> : null}
                <DataLine Name={"Operaattori"} Data={operatorShortCode}/>
                <DataLine Name={"Tyyppi"} Data={RataTypes(category)}/>
                <DataLine Name={"Nopeus"} Data={speed} DataUnit={"km/h"}/>
                {commuterLineId ? <div style={{height: "0.5rem"}}/> : null}
                <DataLine Name={"Linja"} Data={commuterLineId}/>
            </Databox>
            {/*{trainMessageRec ? JSON.stringify(props.Vehicle.content.timetableRows) : null}*/}
            {trainMessageRec ?
                <>
                    {composition ?
                        <Databox header={"Kokoonpano"} color={colorTheme[vehicleType]}
                                 textColor={getContrastYIQ(colorTheme[vehicleType])}
                        >
                            {composition.map(section =>
                                <>
                                    <h3>{RataStations(section.beginUICCOde, section.begin)} - {RataStations(section.endUICCode, section.begin)}</h3>
                                    <RataCompositionTable rows={section.composition}/>
                                    <div style={{height: "0.5rem"}}/>
                                    <DataLine Name={"Pituus"} Data={section.length} DataUnit={"m"}/>
                                    <DataLine Name={"Maksiminopeus"} Data={section.maxSpeed} DataUnit={"km/h"}/>
                                </>
                            )}
                        </Databox>
                        :
                        null
                    }
                    <Databox header={"Aikataulu"} color={colorTheme[vehicleType]}
                             textColor={getContrastYIQ(colorTheme[vehicleType])}
                    >
                        <RataTimetable rows={timetableRows}/>
                        {/*<button onClick={(i) => {console.log(props.Vehicle)}}>click</button>*/}
                    </Databox>
                </>
                :
                <Databox header={"Aikataulu"} color={colorTheme[vehicleType]}
                           textColor={getContrastYIQ(colorTheme[vehicleType])}
                >
                    Ladataan...
                </Databox>}
        </>
    )
}