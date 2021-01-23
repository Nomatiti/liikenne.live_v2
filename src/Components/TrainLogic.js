import {MakeAPICall, messageHandler, Mqtt, RataMessageHandler} from "../Services";

export default function TrainLogic() {
    return(
        <>
            <Mqtt
                url={"wss://rata.digitraffic.fi/mqtt"}
                options={{port: 443}}
                subscription={["train-locations/#", "trains/#"]}
                function={messageHandler}
                api={"rata"}
            />
            {/*<MakeAPICall url={"https://rata.digitraffic.fi/api/v1/metadata/stations"}/>*/}
            {/*<MakeAPICall url={"https://rata.digitraffic.fi/api/v1/metadata/operators"}/>*/}
            <MakeAPICall
                url={"https://rata.digitraffic.fi/api/v1/trains/" + new Date().toISOString().substring(0, 10)}
                function={data => {
                    console.log("Loaded today's train metadata")
                    try {
                        data.forEach(item => {
                            //messageHandler(item, "trains/", "rata")
                            RataMessageHandler(item, "trains/", true)
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }}
            />
            <MakeAPICall
                url={"https://rata.digitraffic.fi/api/v1/train-locations/latest/"}
                function={data => {
                    console.log("Loaded train locations")
                    try {
                        data.forEach(item => {
                            //messageHandler(item, "trains/", "rata")
                            RataMessageHandler(item, "train-locations/", true)
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }}
            />
        </>
    )
}