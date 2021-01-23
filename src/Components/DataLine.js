export default function DataLine(props) {
    if (props.Data) {
        return (
            <div>
                <span style={{fontWeight: "bold"}}>{props.Name}:</span> {props.Data} {props.DataUnit}
            </div>
        )
    } else {
        return null;
    }
}