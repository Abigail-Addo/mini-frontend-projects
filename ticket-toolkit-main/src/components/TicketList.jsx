import React from 'react'
import Ticket from './Ticket'


const TicketList = ({tickets}) => {
  return (
    <div className='ticketBox'>
      {tickets.map((ticket) => (
          <Ticket ticket={ticket} key={ticket._id} />
      ))}
    </div>
  )
}

export default TicketList;

