import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRasps = createAsyncThunk("rasps/fetchRasps", async () => {
  const { data } = await axios.get("/rasps");
  return data;
});

export const fetchRemoveRasp = createAsyncThunk(
  "rasps/fetchRemoveRasp",
  async (id) => {await axios.delete(`/rasps/${id}`);
  return id;
    }
);

const initialState = {
  rasps: {
    items: [],
    status: "loading",
  },
};

const raspsSlice = createSlice({
  name: "rasps",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRasps.pending]: (state) => {
      state.rasps.status = "loading";
    },
    [fetchRasps.fulfilled]: (state, action) => {
      state.rasps.items = action.payload;
      state.rasps.status = "loaded";
    },
    [fetchRasps.rejected]: (state) => {
      state.rasps.items = [];
      state.rasps.status = "error";
    },
    [fetchRemoveRasp.fulfilled]: (state, action) => {
      const deletedId = action.payload;
      state.rasps.items = state.rasps.items.filter((obj) => obj.id !== deletedId);
    },
  },
});

export const raspsReducer = raspsSlice.reducer;
