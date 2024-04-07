import { FETCH_TICKET } from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Tickets = () => {

  const tickets = useSelector((state) => state.tickets.tickets);

  const dispatch = useDispatch();

  useEffect(() => {
  dispatch({ type: FETCH_TICKET, payload: tickets });
  }, [dispatch]);


  return (
    <>
      <h1>Tickets</h1>
      {tickets.map((ticket) => (
        <div className='card' key={ticket.id}>
          <h4> {ticket.title}</h4>
          <p> {ticket.desc}</p>
          <i className="bi bi-pencil"></i>
        </div>

      ))}


    </>
  )
}

export default Tickets;
