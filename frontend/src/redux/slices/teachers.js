//Мы тут и осталис мой друг
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTeachers = createAsyncThunk("teachers/fetchTeachers", async () => {
  const { data } = await axios.get("/teachers");
  return data;
});

export const fetchRemoveTeacher = createAsyncThunk(
  "teachers/fetchRemoveTeacher",
  async (id) => axios.delete(`/teachers/${id}`)
);

const initialState = {
  teachers: {
    items: [],
    status: "loading",
  },
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTeachers.pending]: (state) => {
      state.teachers.status = "loading1111";
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      state.teachers.items = action.payload;
      state.teachers.status = "loaded222";
    },
    [fetchTeachers.rejected]: (state) => {
      state.teachers.items = [];
      state.teachers.status = "error";
    },
    [fetchRemoveTeacher.pending]: (state, action) => {
      state.teachers.items = state.teachers.items.filter(
        (obj) => obj.id !== action.meta.arg
      );
    },
  },
});

export const teachersReducer = teachersSlice.reducer;
