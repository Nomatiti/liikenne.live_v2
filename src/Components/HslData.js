import {Databox, DataLine, HslDelay} from "./";
import {HslLocationSources, HslOperatorToName, HslVehType} from "../Services";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBusAlt, faShip, faSubway, faTrain} from "@fortawesome/free-solid-svg-icons";
import {colorTheme, getContrastYIQ} from "../Styling";

function HslData(props) {
    const { vehicleType, displayName, content = {} } = props.Vehicle;
    const { speed, acceleration, doors, delayS, operator, locationSource, stopArrTime } = content;

    let icon;

    switch (vehicleType) {
        case "HSL/train":
            icon = faTrain
            break
        case "HSL/metro":
            icon = faSubway
            break
        case "HSL/tram":
            icon = faTrain
            break
        case "HSL/ferry":
            icon = faShip
            break
        default:
            icon = faBusAlt
            break
    }

    const acc = <span>m/s<sup style={{verticalAlign: "super", fontSize:"smaller"}}>2</sup></span>

    const Otsikko = <><FontAwesomeIcon icon={icon}/> {HslVehType(vehicleType)} {displayName}</>

    let nextArrival = null;

    if (stopArrTime !== null) {
        if (stopArrTime >= Date.now()) {
            nextArrival = new Date(stopArrTime).toLocaleTimeString()
        }
    }

    return(
        <div>
            <Databox header={Otsikko} color={colorTheme[vehicleType]} textColor={getContrastYIQ(colorTheme[vehicleType])}>
                <DataLine Name={"Operaattori"} Data={HslOperatorToName(operator)}/>
                <DataLine Name={"Nopeus"} Data={(speed * 3.6).toFixed(2)} DataUnit={"km/h"}/>
                <DataLine Name={"Kiihtyvyys"} Data={acceleration} DataUnit={acc}/>
                <DataLine Name={"Sijaintilähde"} Data={HslLocationSources(locationSource)}/>
                <DataLine Name={"Ovet"} Data={doors === 1 ? "Auki": "Kiinni"}/>
                <HslDelay DelayS={delayS}/>
                <DataLine Name={"Seuraavalla pysäkillä"} Data={nextArrival}/>
            </Databox>
        </div>
    )
}

export default HslData;