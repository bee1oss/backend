import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);
export const fetchUpdateMe = createAsyncThunk("auth/fetchUpdateMe", async (updateData, { getState }) => {
  try {
    const { data } = await axios.patch("/auth/update/me", updateData);
    // Kullanıcının profil bilgileri güncellendiğinde, güncellenmiş veriyi Redux store'a aktarabiliriz
    const currentState = getState();
    const updatedUserData = { ...currentState.auth.data, ...updateData };
    return updatedUserData;
  } catch (error) {
    throw error; // Hata durumunda hatayı yeniden fırlat
  }
});


const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    /*buradan*/
    [fetchUpdateMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUpdateMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchUpdateMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});
export const selectIsAuth = (state) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const selectUserRole = (state) => state.auth.data ? state.auth.data.userRole : null;

export const selectUserID = (state) => state.auth.data ? state.auth.data._id : null;


