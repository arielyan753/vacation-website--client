import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { vacationReducer } from "./VacationState";


const reducers = combineReducers({ vacationState: vacationReducer, authState: authReducer });

const store = createStore(reducers);

export default store;
