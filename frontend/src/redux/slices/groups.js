import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const { data } = await axios.get("/groups");
  return data;
});

export const fetchRemoveGroup = createAsyncThunk(
  "groups/fetchRemoveGroup",
  async (id) => axios.delete(`/groups/${id}`)
);

const initialState = {
  groups: {
    items: [],
    status: "loading",
  },
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGroups.pending]: (state) => {
      state.groups.status = "loading1111";
    },
    [fetchGroups.fulfilled]: (state, action) => {
      state.groups.items = action.payload;
      state.groups.status = "loaded222";
    },
    [fetchGroups.rejected]: (state) => {
      state.groups.items = [];
      state.groups.status = "error";
    },
    [fetchRemoveGroup.pending]: (state, action) => {
      state.groups.items = state.groups.items.filter(
        (obj) => obj.id !== action.meta.arg
      );
    },
  },
});

export const groupsReducer = groupsSlice.reducer;
