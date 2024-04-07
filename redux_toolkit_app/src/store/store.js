import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from './features/tickets/ticketsSlice'
import authReducer from './features/userAuth/authSlice'

export const store = configureStore({
    reducer: {
        tickets: ticketsReducer,
        auth: authReducer
    }
})