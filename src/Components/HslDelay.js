import {prettyHslTimeDelay} from "../Services/prettyDateFunctions";

function HslDelay(props) {

    let style;

    if (props.DelayS >= 60) {
        style = {color: "#00b000"}
    }
    if (props.DelayS <= -60) {
        style = {color: "#d02929"}
    }

    return(
        props.DelayS && props.DelayS !== 0 ?
            <div>
                <span style={{fontWeight: "bold"}}>
                    {props.DelayS < 0 ? "Jäljessä: " : "Etuajassa: "}
                </span>
                <span style={style}> {prettyHslTimeDelay(Math.abs(props.DelayS))}</span>
            </div>
        :
            null
    )
}

export default HslDelay;