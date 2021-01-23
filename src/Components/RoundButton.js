import './RoundButton.css';

export default function RoundButton(props) {
        return (
            <button id={props.apiName} onClick={props.click} className={`RoundButton ${props.icon ? "RoundButtonIcon" : ""} ${props.selected ? "RoundButtonSelected" : ""}`}>
                {props.children}
            </button>
        )
}