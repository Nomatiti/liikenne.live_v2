import HslData from "./HslData";
import {getSelectedData} from "../Redux/selectors";
import {connect} from "react-redux";
import {Databox, RataData} from "./index";

function SelectedData(props) {
    switch (props.Vehicle.api) {
        case "HSL":
            return <HslData Vehicle={props.Vehicle}/>
        case "Rata":
            return <RataData Vehicle={props.Vehicle}/>
        default:
            return <Databox>
                <span style={{marginTop: "1rem", fontWeight: "600"}}>Klikkaa kulkuneuvoa kartalla nähdäksesi lisätietoja</span>
            </Databox>
    }
}

const mapStateToProps = state => {
    const Vehicle = getSelectedData(state);
    return { Vehicle };
};

export default connect(mapStateToProps)(SelectedData);