import './Table.css'

export default function TableRow(props) {
    return (
        props.header ?
            <tr className={"TableRow"} style={props.lineStyle}>
                {props.line.map(item =>
                    <th className={"TableCell"}>{item}</th>
                )}
            </tr>
            :
            <tr className={"TableRow"} style={props.lineStyle}>
                {props.line.map(item =>
                    <td className={"TableCell"}>{item}</td>
                )}
            </tr>
    )
}