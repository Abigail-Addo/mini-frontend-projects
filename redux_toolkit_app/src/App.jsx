import { useEffect, useState } from "react";
import "./App.css";
import TicketList from "./components/TicketList";

// import { nanoid } from "@reduxjs/toolkit"; for generating random ids or strings
import {
  addTicketThunk,
  fetchTicketsThunk,
} from "./store/features/tickets/ticketsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.tickets);

  const { user } = useSelector((state) => state.auth);

  const userData = !!user;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const ticket = {
      title,
      desc,
      user: user._id,
    };

    dispatch(addTicketThunk(ticket));
    setDesc("");
    setTitle("");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (userData) {
      dispatch(fetchTicketsThunk(user._id));
    }
  }, [navigate, userData, dispatch]);

  return (
    <>
      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label htmlFor="desc">Description:</label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="6"
            placeholder="Description"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          ></textarea>
          <button type="submit" className="submit_button">
            Submit
          </button>
        </form>

        <TicketList tickets={tickets} />

        <style jsx="true">
          {`
            form {
              border: 1px solid salmon;
              display: flex;
              flex-direction: column;
              gap: 1rem;
              width: 30%;
              padding: 3rem;
            }
          `}
        </style>
      </div>
    </>
  );
}

export default App;
