import './App.css';
import {ApiSelector, Bottombar, Sidebar, Map, SelectedData, TrainLogic, BatchDispatcher} from "./Components";
import {Mqtt, messageHandler, useWindowDimensions} from "./Services";

export default function App()  {
    const {height, width } = useWindowDimensions();

    const dataPanels =
        <>
            <ApiSelector/>
            <SelectedData/>
        </>

    return (
        <div className="App">
            <BatchDispatcher/>
            <Mqtt
                url={"wss://mqtt.hsl.fi:443"}
                subscription={"/hfp/v2/journey/+/+/+/+/+/+/+/+/+/+/3/#"}
                function={messageHandler}
                api={"HSL"}
            />
            <Mqtt
                url={"wss://meri.digitraffic.fi/mqtt"}
                options={{port: 61619, username: "digitraffic", password: "digitrafficPassword"}}
                subsciption={["#"]}
                function={(i) => {console.log(i)}}
            />
            <TrainLogic/>

            {width >= height ?
                <>
                    <Sidebar>
                        {dataPanels}
                    </Sidebar>
                    <Map side={width >= height}/>
                </>
                :
                <>
                    <Bottombar>
                        {dataPanels}
                    </Bottombar>
                    <Map side={width >= height}/>
                </>
            }
        </div>
    );
}
