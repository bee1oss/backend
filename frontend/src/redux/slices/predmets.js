//Мы тут и осталис мой друг
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPredmets = createAsyncThunk("predmets/fetchPredmets", async () => {
  const { data } = await axios.get("/predmets");
  return data;
});

export const fetchRemovePredmet = createAsyncThunk(
  "predmets/fetchRemovePredmet",
  async (id) => axios.delete(`/predmets/${id}`)
);

const initialState = {
  predmets: {
    items: [],
    status: "loading",
  },
};

const predmetsSlice = createSlice({
  name: "predmets",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPredmets.pending]: (state) => {
      state.predmets.status = "loading1111";
    },
    [fetchPredmets.fulfilled]: (state, action) => {
      state.predmets.items = action.payload;
      state.predmets.status = "loaded222";
    },
    [fetchPredmets.rejected]: (state) => {
      state.predmets.items = [];
      state.predmets.status = "error";
    },
    [fetchRemovePredmet.pending]: (state, action) => {
      state.predmets.items = state.predmets.items.filter(
        (obj) => obj.id !== action.meta.arg
      );
    },
  },
});

export const predmetsReducer = predmetsSlice.reducer;
