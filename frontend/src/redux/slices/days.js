import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchDays = createAsyncThunk("days/fetchDays", async () => {
  const { data } = await axios.get("/days");
  return data;
});

export const fetchRemoveDay = createAsyncThunk(
  "days/fetchRemoveDay",
  async (id) => axios.delete(`/days/${id}`)
);

const initialState = {
  days: {
    items: [],
    status: "loading",
  },
};

const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDays.pending]: (state) => {
      state.days.status = "loading1111";
    },
    [fetchDays.fulfilled]: (state, action) => {
      state.days.items = action.payload;
      state.days.status = "loaded222";
    },
    [fetchDays.rejected]: (state) => {
      state.days.items = [];
      state.days.status = "error";
    },
    [fetchRemoveDay.pending]: (state, action) => {
      state.days.items = state.days.items.filter(
        (obj) => obj.id !== action.meta.arg
      );
    },
  },
});

export const daysReducer = daysSlice.reducer;
