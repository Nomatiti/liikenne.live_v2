import { SELECTED } from "../actionTypes";

const initialState = null;

const Selected = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED: {
            return action.payload ? action.payload : state;
        }
        default: {
            return state;
        }
    }
};

export default Selected;
