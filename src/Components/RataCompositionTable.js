import {TableRow} from "./index"
import './Table.css'

export default function RataCompositionTable(props) {
    let table = []

    props.rows.forEach((row, index) => {
        // if (row.stopping === true || showAll === true) {
        //     let arrivalData = "-"
        //     let departureData = "-"
        //     let style = {}
        //
        //     if (row.arr) {
        //         if (row.arr.actTime) {
        //             style = {color: "#727171"}
        //         }
        //         arrivalData = timeCell(row.arr)
        //     }
        //     if (row.dep) {
        //         if (row.dep.actTime) {
        //             style = {color: "#727171"}
        //         }
        //         departureData = timeCell(row.dep)
        //     }
        //
        //     table.push({style: style, line: [arrivalData,
        //             <span>{RataStations(row.stationShortCode)}<br/>{row.track ? <span>Raide: {row.track}</span> : null}</span>,
        //             departureData]})
        // }
        let location = index + 1
        let type = row.type
        let saleNumber = row.salesNumber

        table.push({style: {}, line: [location, type, saleNumber]})
    })

    return (
        <table className={"Table"}>
            <TableRow
                line={["Sijainti", "Tyyppi", "Vaununumero"]}
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