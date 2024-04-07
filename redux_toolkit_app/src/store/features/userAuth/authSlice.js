import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    success: false,
    user: null
}


export const SignUp = createAsyncThunk('auth/signup', async (user) => {
    const response = await axios.post(import.meta.env.VITE_API_URI_AUTH, user);
    const { data } = response;
    console.log(data)
    return data;
});


export const SignIn = createAsyncThunk('auth/signin', async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URI_AUTH}/login`, user, {
            withCredentials: true
        });
        const { data } = response;
        return data;
    } catch (error) {
        console.log(error)
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const SignOut = createAsyncThunk('auth/signout', async (thunkAPI) => {
    try {
        const response = await axios(`${import.meta.env.VITE_API_URI_AUTH}/logout`, {
            withCredentials: true
        });
        const { data } = response;
        console.log(data)
        return data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(SignUp.pending, state => {
                state.loading = true
            })
            .addCase(SignUp.fulfilled, (state) => {
                state.loading = false
                state.success = true;
            })
            .addCase(SignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(SignIn.pending, state => {
                state.loading = true
            })
            .addCase(SignIn.fulfilled, (state, action) => {
                state.loading = false
                state.success = true;
                state.user = action.payload
            })
            .addCase(SignIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })
            .addCase(SignOut.pending, state => {
                state.loading = true
            })
            .addCase(SignOut.fulfilled, (state) => {
                state.loading = false
                state.user = null
            })
            .addCase(SignOut.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })

            .addDefaultCase()
    }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;

