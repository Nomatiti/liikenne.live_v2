import { VISIBILITY_FILTERS } from "../constants";

export const getTodosState = store => store.todos;

export const getTodoList = store =>
    getTodosState(store) ? getTodosState(store).allIds : [];

export const getTodoById = (store, id) =>
    getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = store =>
    getTodoList(store).map(id => getTodoById(store, id));

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
    const allTodos = getTodos(store);
    switch (visibilityFilter) {
        case VISIBILITY_FILTERS.COMPLETED:
            return allTodos.filter(todo => todo.completed);
        case VISIBILITY_FILTERS.INCOMPLETE:
            return allTodos.filter(todo => !todo.completed);
        case VISIBILITY_FILTERS.ALL:
        default:
            return allTodos;
    }
};

export const getVehicleState = store => store.Vehicles;

export const getVehicleIds = store =>
    getVehicleState(store) ? getVehicleState(store).allIds : [];

export const getVehicleById = (store, id) =>
    getVehicleState(store) ? { ...getVehicleState(store).byIds[id] } : {};

export const getVehicles = store =>
    getVehicleIds(store).map(id => getVehicleById(store, id));


export const getSelected = store =>
    store.Selected;

export const getSelectedData = store =>
    getVehicleById(store, getSelected(store));


export const getMessageCount = store =>
    getVehicleState(store) ? getVehicleState(store).messageCount : null;

export const getMessageAVG = store =>
    Math.round(store.Vehicles.messageCount / ((Date.now() - store.Vehicles.startTime) / 1000));

export const getConstant = (store, id) =>
    store.Constants[id]
