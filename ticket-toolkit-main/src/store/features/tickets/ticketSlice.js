import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    tickets: [],
    loading: false,
    error: null
}


//asynchronous thunk
export const addTicketThunk = createAsyncThunk('tickets/addTicket', async (ticket) => {
    try {
        const response = await fetch('http://localhost:5000/api/ticket', {
            method: 'POST',
            body: JSON.stringify(ticket),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json() 
        // console.log('adding ticket---', data);
        // console.log(data)
        return data
    } catch (error) {
        console.log(error)
        
    }
})


export const fetchTicketsThunk = createAsyncThunk('tickets/allTickets', async (tickets) => {
    try {
        const response = await fetch('http://localhost:5000/api/tickets');

        const data = await response.json(tickets)
        // console.log(data)
        return data

    } catch (error) {
        console.log(error)
    }
})


export const deleteTicketThunk = createAsyncThunk('tickets/deleteTicket', async (id) => {
    try {
     const response = await fetch(`http://localhost:5000/api/ticket/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
     })

     const deleteTicket = await response.json();
     console.log('deleting ticket...', deleteTicket)

    } catch (error) {
        console.log(error)
    }
})


export const updateTicketThunk = createAsyncThunk('tickets/updateTicket', async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/tickets/${id}`, {
            method: 'PUT',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const ticketUpdate = await response.json();
        console.log('editing ticket', ticketUpdate)
        return ticketUpdate

    } catch (error) {
        console.log(error)
    }
})



const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers:{
        addTicket: (state, action) => {
            state.tickets.push(action.payload)
        },

        deleteTicket: (state, action) => {
            state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload)
        }, 

        updateTicket: (state, action) => {
            state.tickets = state.tickets.map(ticket => ticket.id === action.payload ? {...ticket, workedOn:!ticket.workedOn}: ticket)
        }
    },
    extraReducers: builder => {
        builder
            // adding a ticket
            .addCase(addTicketThunk.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addTicketThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets.push(action.payload);
            }) 
            .addCase(addTicketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //fetching tickets
            .addCase(fetchTicketsThunk.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchTicketsThunk.fulfilled, (state, action) => {
                state.loading = true;
                state.tickets = action.payload;
            }) 
            .addCase(fetchTicketsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // deleting tickets
            .addCase(deleteTicketThunk.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteTicketThunk.fulfilled, (state, action) => {
                state.loading = true;
                state.tickets = state.tickets.filter(ticket => ticket._id !== action.payload);
            }) 
            .addCase(deleteTicketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // updating tickets
            .addCase(updateTicketThunk.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(updateTicketThunk.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = true;
                state.tickets = state.tickets.map(ticket => ticket._id === action.payload ? {...ticket, workedOn:!ticket.workedOn}: ticket);
            }) 
            .addCase(updateTicketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
})


export const {addTicket, deleteTicket, updateTicket} = ticketSlice.actions

export default ticketSlice.reducer;


// export const ticketReducer = ticketSlice.reducer; 
// this is a named export so when importing it anywhere in my application it would be import { ticketReducer } from"./features/tickets/ticketSlice";



// export const when you want to export a variable or function