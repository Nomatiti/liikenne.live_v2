import { combineReducers } from "redux";
import Vehicles from "./Vehicles";
import Selected from "./Selected";
import Constants from "./Constants";


export default combineReducers({Selected, Vehicles, Constants //visibilityFilter
});
