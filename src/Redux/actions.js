import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_FILTER,
    COUNT,
    VEHICLE_ADD,
    VEHICLE_HSL_UPDATE,
    SELECTED,
    CONSTANT_ADD
} from "./actionTypes";

let nextTodoId = 0;

export const addTodo = content => ({
    type: ADD_TODO,
    payload: {
        id: ++nextTodoId,
        content
    }
});

export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    payload: { id }
});

export const count = content => ({
    type: COUNT,
    payload: { content }
});

export const vehicleAdd = (id, displayName, vehicleType, api, coordinates, content) => ({
    type: VEHICLE_ADD,
    payload: {
        id: id,
        displayName: displayName,
        vehicleType: vehicleType,
        api: api,
        coordinates: coordinates,
        content: content
    }
});

export const vehicleHslUpdate = (id, coordinates, content) => ({
    type: VEHICLE_HSL_UPDATE,
    payload: {
        id: id,
        coordinates: coordinates,
        content: content
    }
});

export const setSelected = id => ({
    type: SELECTED,
    payload: id
});

export const setConstant = (id, data) => ({
    type: CONSTANT_ADD,
    payload: data
})


export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
