import { VEHICLE_ADD, VEHICLE_HSL_UPDATE, COUNT } from "../actionTypes";

const initialState = {
    allIds: [],
    byIds: {},
    messageCount: 0,
    startTime: undefined
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
        case VEHICLE_ADD: {
            const { id, displayName, vehicleType, api, coordinates, content } = action.payload;

            let finalContent = {}
            let finalCoordinates = []

            let updatedType = vehicleType;

            if (state.byIds[id]) {
                const newType = vehicleType.split("/")
                const oldType = state.byIds[id].vehicleType.split("/")

                if (oldType[1] && !newType[1]) {
                    updatedType = state.byIds[id].vehicleType
                }

                finalContent = {
                    ...state.byIds[id].content,
                    ...content
                }
                const oldC = state.byIds[id].coordinates
                finalCoordinates = [coordinates[0] ? coordinates[0] : oldC[0], coordinates[1] ? coordinates[1] : oldC[1]]
            } else {
                finalContent = {
                    ...content
                }
            }

            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        displayName: displayName,
                        vehicleType: updatedType,
                        api: api,
                        coordinates: finalCoordinates,
                        // content
                        content: finalContent
                    }
                },
                messageCount: state.messageCount + 1,
                startTime: state.startTime ? state.startTime : Date.now()
            };
        }
        case VEHICLE_HSL_UPDATE: {
            const { id, coordinates, content } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        coordinates: coordinates,
                        content: {
                            ...state.byIds[id].content,
                            content
                        }
                    }
                },
                messageCount: state.messageCount + 1,
                startTime: state.startTime ? state.startTime : Date.now()
            };
        }
        case COUNT: {
            return {
                ...state,
                messageCount: state.messageCount + 1,
                startTime: state.startTime ? state.startTime : Date.now()
            }
        }
        default:
            return state;
    }
}
