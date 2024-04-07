import { useEffect, useState } from 'react';
import './App.css';
import TicketList from './components/TicketList'
import { useDispatch, useSelector } from 'react-redux';
import { addTicket } from './store/features/tickets/ticketSlice';
import { addTicketThunk, fetchTicketsThunk  } from './store/features/tickets/ticketSlice';


function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const tickets = useSelector(state => state.tickets.tickets);
  // console.log(tickets);


  const handleSubmit = (e) => {
    e.preventDefault();

    const ticket = {
      title,
      description,
      workedOn: false
    }

    // dispatch(addTicket(ticket))
    // setTitle("")
    // setDescription("")

    dispatch(addTicketThunk(ticket));
    setTitle("");
    setDescription("")
  };


  useEffect(() => {
    dispatch(fetchTicketsThunk());
  }, [dispatch]);



   return (
    <div className="App">
      <form onSubmit={handleSubmit}>

        <div className='formInput'>
        <label>Title</label>
        <input type="text" name="title" placeholder="heading"
        value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        
        <div className='formInput'>
        <label>Description</label>
        <textarea type="textarea" col="40" rows="7" placeholder='description'
        value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type='submit' className='addBtn'>Add Ticket</button>
      </form>

      <TicketList tickets={tickets}/> 
      {/* pass what we get from the state into the curly braces */} 
      
    </div>
  );
}

export default App;



// This is for the generated ID 
// import { nanoid } from '@reduxjs/toolkit';  // generating random IDs

// const handleSubmit = (e) => {
//   e.preventDefault();

//   const ticket = {
//     id: nanoid(),
//     title,
//     description,
//     workedOn: false
//   }
