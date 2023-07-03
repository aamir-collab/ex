import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createExpAction = createAsyncThunk(
  'expense/create',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'appliaction/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/expenses',
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchAllExpAction = createAsyncThunk(
  'expense/fetch',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        'Content-Type': 'appliaction/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/expenses?page=${payload}`,
        payload,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


const expenseSlices = createSlice({
  name: 'expenses',
  initialState: { expense: ['43', '53'] },
  extraReducers: (builder) => {
    builder.addCase(createExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(createExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    builder.addCase(fetchAllExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(fetchAllExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });
  },
});

export default expenseSlices.reducer;
