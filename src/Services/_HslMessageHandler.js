import updateStack from "../Redux/batch";

let times = 0
export default function HslMessageHandler(data, url) {
    let key = Object.keys(data);

    if (key.length > 1) {
        //TODO: Send log to AWS
    }
    let values = data[key[0]];

    let type = "-"
    try {
        type = url.split("/")[6]
    } catch (e) {
        //TODO: error to aws
    }

    if (times < 10 && values.ttarr) {
        //console.log(data)
        times++
    }

    updateStack.addUpdate = {
        id: values.oper + "-" + values.veh,
        displayName: values.desi ? values.desi : "-",
        vehicleType: "HSL/" + type,
        api: "HSL",
        coordinates: [values.long, values.lat],
        content: {
            ...(values.dir) && {dir: values.dir}, //Not on all messages
            ...(values.desi) && {desi: values.desi}, //Not on all messages
            ...(values.oper) && {operator: values.oper},
            ...(values.tsi) && {time: values.tsi},
            ...(values.spd) && {speed: values.spd},
            ...(values.hdg) && {heading: values.hdg},
            ...(values.acc) && {acceleration: values.acc},
            ...(values.dl) && {delayS: values.dl}, //Not on all messages
            ...(values.drst !== undefined) && {doors: values.drst},
            ...(values.start) && {startTime: values.start}, //Not on all messages
            ...(values.loc) && {locationSource: values.loc},
            ...(values.stop) && {stop: values.stop}, //Not on all messages
            ...(values.route) && {route: values.route}, //Not on all messages
            ...(values.ttarr) && {stopArrTime: values.ttarr}, //Not on all messages
            ...(values.ttdep) && {stopDepTime: values.ttdep} //Not on all messages
        }
    };
}