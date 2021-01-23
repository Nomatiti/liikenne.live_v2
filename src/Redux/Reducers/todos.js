import {ADD_TODO, COUNT, TOGGLE_TODO} from "../actionTypes";

const initialState = {
    allIds: [],
    byIds: {},
    messageCount: 0
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO: {
            const { id, content } = action.payload;
            return {
                ...state,
                allIds: [...state.allIds, id],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        content,
                        completed: false
                    }
                }
            };
        }
        case TOGGLE_TODO: {
            const { id } = action.payload;
            return {
                ...state,
                byIds: {
                    ...state.byIds,
                    [id]: {
                        ...state.byIds[id],
                        completed: !state.byIds[id].completed
                    }
                }
            };
        }
        case COUNT: {
            return {
                ...state,
                messageCount: state.messageCount + 1
            }
        }
        default:
            return state;
    }
}
