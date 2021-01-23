
import store from "../Redux/store";

function geoJSON() {
    let vehicles = store.getState().Vehicles
    let JSON = {
        type: "FeatureCollection",
        features: []
    }

    vehicles.allIds.forEach((ID) => {
        let veh = vehicles.byIds[ID]
        JSON.features.push({
            type: "Feature",
            properties: {
                ...veh.content,
                id: ID,
                displayName: veh.displayName,
                vehicleType: veh.vehicleType
            },
            geometry: {
                type: "Point",
                coordinates: [veh.coordinates[0], veh.coordinates[1]]
            }
        })
    })

    return JSON
}

export default geoJSON;