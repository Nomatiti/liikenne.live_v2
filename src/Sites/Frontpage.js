import { FullpagePicture } from "../Components";
import { ParallaxProvider } from "react-scroll-parallax";
import '../Components/Databox.css';
import bus from '../Media/bus.svg';
import ship from '../Media/ship.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

function Frontpage() {
    return (
        <ParallaxProvider>
            <div className="App">
                <FullpagePicture/>
                <div style={{height: "200vh"}}>
                    <FontAwesomeIcon icon={faArrowDown} style={
                        {
                            paddingTop: "-1rem",
                            transform: "translateY(-2.2rem)",
                            fontSize: "2rem",
                            color: "#333",
                            animation: "500ms ease-in-out alternate infinite slidein",
                            cursor: "pointer"
                        }
                    }/>
                    <img src={bus}/>
                    <img src={ship}/>
                </div>
                <a href='https://www.freepik.com/vectors/car'>Car vector created by catalyststuff - www.freepik.com</a>
                <a href='https://www.freepik.com/vectors/cartoon'>Cartoon vector created by pch.vector - www.freepik.com</a>
            </div>
        </ParallaxProvider>
    );
}

export default Frontpage;
