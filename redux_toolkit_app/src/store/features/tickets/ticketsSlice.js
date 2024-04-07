import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    tickets: [],
    loading: false,
    error: null
}

// asynchronous thunks
export const addTicketThunk = createAsyncThunk('addTicket', async (ticket, thunkAPI) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URI_TICKET}/${ticket.user}`, {
            method: 'post',
            body: JSON.stringify(ticket),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        },)
        const data = await response.json()
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const fetchTicketsThunk = createAsyncThunk('fetchTickets', async (userId, thunkAPI) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URI_AUTH}/${userId}`, { credentials: 'include' });
        const data = await response.json();
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);

    }
})

export const updateTicketThunk = createAsyncThunk('updateTicket', async (id) => {
    const response = await fetch(`http://localhost:7000/api/tickets/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data;
})

export const deleteTicketThunk = createAsyncThunk('deleteTicket', async (id) => {
    const response = await fetch(`http://localhost:7000/api/tickets/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data;
})


const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        addTicket: (state, action) => {
            state.tickets.push(action.payload)
        },

        deleteTicket: (state, action) => {
            state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload)
        },

        updateTicket: (state, action) => {
            state.tickets = state.tickets.map((ticket) => ticket.id === action.payload ? { ...ticket, workedOn: !ticket.workedOn } : ticket)
        }
    },
    extraReducers: builder => {
        builder
            // adding a ticket
            .addCase(addTicketThunk.pending, (state) => {
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
            // fetching tickets
            .addCase(fetchTicketsThunk.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchTicketsThunk.fulfilled, (state, action) => {
                if (action.payload.message) {
                    state.error = action.payload.message
                }
                state.loading = false;
                state.tickets = action.payload.tickets;
            })
            .addCase(fetchTicketsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // updating a ticket
            .addCase(updateTicketThunk.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateTicketThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = state.tickets.map((ticket) => ticket._id === action.payload._id ? action.payload : ticket)
            })
            .addCase(updateTicketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // deleting a ticket
            .addCase(deleteTicketThunk.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteTicketThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = state.tickets.filter((ticket) => ticket._id !== action.payload._id);
            })
            .addCase(deleteTicketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addDefaultCase()
    }
})

export const { addTicket, deleteTicket, updateTicket } = ticketSlice.actions

export default ticketSlice.reducer;




