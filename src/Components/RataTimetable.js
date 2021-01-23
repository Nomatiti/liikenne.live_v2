import {TableRow} from "./index"
import './Table.css'
import {RataStations} from "../Services";

function timeCell(depOrArr) {
    const timeFormat = {hour: "numeric", minute: "numeric", second: "numeric"}

    let arrivalData = "-";

    if (depOrArr.actTime) {
        arrivalData =
            (depOrArr.timeDiff !== 0) ?
                <>
                    <span style={depOrArr.timeDiff < 0 ? {color: "green"} : {color: "red"}}>{depOrArr.actTime.toLocaleTimeString([], timeFormat)}</span>
                    <br/>
                    <span>({depOrArr.schedTime.toLocaleTimeString([], timeFormat)})</span>
                </>
                :
                <span>{depOrArr.schedTime.toLocaleTimeString([], timeFormat)}</span>
    } else {
        arrivalData =
            (depOrArr.timeDiff !== 0 && depOrArr.liveEstimateTime) ?
                <>
                    <span style={depOrArr.timeDiff < 0 ? {color: "green"} : {color: "red"}}>{depOrArr.liveEstimateTime.toLocaleTimeString([], timeFormat)}</span>
                    <br/>
                    <span>({depOrArr.schedTime.toLocaleTimeString([], timeFormat)})</span>
                </>
                :
                <span>{depOrArr.schedTime.toLocaleTimeString([], timeFormat)}</span>
    }

    return arrivalData
}

export default function RataTimetable(props) {
    const showAll = props.showAll ? props.showAll : false

    let table = []

    props.rows.forEach((row) => {
        if (row.stopping === true || showAll === true) {
            let arrivalData = "-"
            let departureData = "-"
            let style = {}

            if (row.arr) {
                if (row.arr.actTime) {
                    style = {color: "#727171"}
                }
                arrivalData = timeCell(row.arr)
            }
            if (row.dep) {
                if (row.dep.actTime) {
                    style = {color: "#727171"}
                }
                departureData = timeCell(row.dep)
            }

            table.push({style: style, line: [arrivalData,
                    <span>{RataStations(row.stationUICCode, row.stationShortCode)}<br/>{row.track ? <span>Raide: {row.track}</span> : null}</span>,
                    departureData]})
        }
    })

    return (
        <table style={{marginTop: "0.5rem"}} className={"Table"}>
            <TableRow
                line={["Saapuu", "Asema", "Lähtee"]}
                header={true}
            />
            {table.map(item =>
                <TableRow
                    lineStyle={item.style}
                    line={item.line}
                />
            )}
        </table>
    )
}