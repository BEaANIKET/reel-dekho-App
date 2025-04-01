import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../api/axios';
import axios from 'axios';

export const fetchUser = createAsyncThunk(
  'auth/profile',
  async (_, {rejectWithValue}) => {
    console.log('I am runing');

    try {
      const response = await api.get('/auth/profile');
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
