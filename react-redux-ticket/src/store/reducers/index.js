import { combineReducers } from "redux";
import { ticketReducer } from "./ticketReducer";

const rootReducers = combineReducers({
    tickets: ticketReducer,
});

export default rootReducers



  