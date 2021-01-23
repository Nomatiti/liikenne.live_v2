/*
 * Parses the messages from MQTT
 * Outputs the data to redux store
*/
import HslMessageHandler from "./_HslMessageHandler";
import RataMessageHandler from "./RataMessageHandler";

export default function messageHandler(message = "", url, api) {
    let data;
    try {
        data = JSON.parse(message);
    } catch (error) {
        console.error("Error happened: " + error + ", message: " + message.toString());
        //TODO: Send log to AWS
        return null;
    }

    try {

        switch (api) {
            case "HSL":
                HslMessageHandler(data, url)
                break
            case "rata":
                RataMessageHandler(data, url)
                break
            default:
                break
        }

        } catch (error) {
            console.error("Error happened: " + error + ", message: " + message.toString());
            //TODO: Send log to AWS
            return null;
        }
}