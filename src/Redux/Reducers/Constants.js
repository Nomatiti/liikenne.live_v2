import { CONSTANT_ADD } from "../actionTypes";
import {RataConstants} from "../../constants";

const initialState = {
    stationUICCodes: RataConstants.stationUICCodes,
    operatorUICCodes: RataConstants.operatorUICCodes
};

const Constants = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANT_ADD: {
            return {
                ...state,
                [action.id]: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export default Constants;
