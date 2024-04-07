import { useDispatch } from 'react-redux'
import './App.css'
import Tickets from './Tickets'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ADD_TICKET } from './store/actions'

const App = () => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleTicket = (e) => {
    e.preventDefault();

    const ticket = {
      id: uuidv4(),
      title,
      desc,
      workedOn: false
    };

    dispatch({ type: ADD_TICKET, payload: ticket })
  }



  return (
    <>

      <Tickets />

      <form onSubmit={handleTicket}>
        <div className='form-control'>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={title} required onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='form-control'>
          <label htmlFor="desc">Description</label>
          <textarea name="desc" id="desc" cols="30" rows="10" value={desc} required onChange={(e) => setDesc(e.target.value)}></textarea>
        </div>

        <div>
          <button type="submit">Add</button>
        </div>

      </form>

    </>
  )
}

export default App
