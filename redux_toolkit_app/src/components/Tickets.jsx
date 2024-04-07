import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteTicketThunk,
  updateTicketThunk,
} from "../store/features/tickets/ticketsSlice";

function Tickets({ ticket }) {
  const dispatch = useDispatch();

  return (
    <div
      style={
        !ticket.workedOn
          ? {
              backgroundColor: "brown",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }
          : {
              backgroundColor: "purple",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }
      }
    >
      <p>{ticket.title}</p>
      <p>{ticket.desc}</p>
      <button onClick={() => dispatch(updateTicketThunk(ticket._id))}>
        Update
      </button>
      <button onClick={() => dispatch(deleteTicketThunk(ticket._id))}>
        Delete
      </button>
    </div>
  );
}

export default Tickets;
