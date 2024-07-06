import AuthStatus from "./auth";
import AlertStatus from "./alert";
import { combineReducers } from "redux";

const rootReducer= combineReducers({
    AuthStatus,
    AlertStatus
})

export default rootReducer