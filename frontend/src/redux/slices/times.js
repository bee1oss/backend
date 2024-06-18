import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTimes = createAsyncThunk("times/fetchTimes", async () => {
  const { data } = await axios.get("/times");
  return data;
});

export const fetchRemoveTime = createAsyncThunk(
  "times/fetchRemoveTime",
  async (id) => axios.delete(`/times/${id}`)
);

const initialState = {
  times: {
    items: [],
    status: "loading",
  },
};

const timesSlice = createSlice({
  name: "times",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTimes.pending]: (state) => {
      state.times.status = "loading1111";
    },
    [fetchTimes.fulfilled]: (state, action) => {
      state.times.items = action.payload;
      state.times.status = "loaded222";
    },
    [fetchTimes.rejected]: (state) => {
      state.times.items = [];
      state.times.status = "error";
    },
    [fetchRemoveTime.pending]: (state, action) => {
      state.times.items = state.times.items.filter(
        (obj) => obj.id !== action.meta.arg
      );
    },
  },
});

export const timesReducer = timesSlice.reducer;
