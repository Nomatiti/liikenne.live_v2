import './Databox.css';

function Databox(props) {
    let style = {
        backgroundColor: props.color ? props.color : null,
        color: props.textColor ? props.textColor : "black"
    };
    return (
        <div className="Databox">
            {props.header ?
                <div style={style} className="DataboxHeader">
                    <h2>{props.header}</h2>
                </div>
                :
                null
            }
            <div className={`DataboxBreadText ${props.header ? "" : "WithoutHeader"}`}>
                {props.children}
            </div>
        </div>
    );
}

export default Databox;