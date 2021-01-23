import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Sidebar(props) {
    return (
        <div className="Sidebar">
            <button className="ReturnButton"><FontAwesomeIcon icon={faArrowLeft} /></button>

            { props.children }
        </div>
    );
}

export default Sidebar;