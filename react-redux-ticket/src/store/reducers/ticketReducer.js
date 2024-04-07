import { ADD_TICKET, FETCH_TICKET } from "../actions";

const initialState = {
    tickets: []
}

export const ticketReducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case ADD_TICKET: {
            return { tickets: [...state.tickets, action.payload] }
        }
        case FETCH_TICKET: {
            return { tickets: action.payload };
        }
        default:
            return state;
    }
}
