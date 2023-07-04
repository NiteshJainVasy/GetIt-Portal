import { combineReducers } from "redux";
import { ticketTypeReducer } from "./ticketType.reducer";
import { ticketRequestReducer } from "./ticketRequest.reducer";
const rootReducer = combineReducers({
  ticketType: ticketTypeReducer,
  ticketRequest: ticketRequestReducer,
});

export default rootReducer;
