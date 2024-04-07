import React from "react";
import Tickets from "./Tickets";

function TicketList({ tickets }) {
  return (
    <div
      style={{
        padding: "3rem",
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      {tickets.map((ticket) => (
        <Tickets key={ticket._id} ticket={ticket} />
      ))}
    </div>
  );
}

export default TicketList;
