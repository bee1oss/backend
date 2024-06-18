import { configureStore } from "@reduxjs/toolkit";
import { raspsReducer } from "./slices/rasps";
import { timesReducer } from "./slices/times";
import { authReducer } from "./slices/auth";
import { daysReducer } from "./slices/days";
import { predmetsReducer } from "./slices/predmets";
import { teachersReducer } from "./slices/teachers";
import { groupsReducer } from "./slices/groups";

const store = configureStore({
  reducer: {
    times: timesReducer,
    days: daysReducer,
    rasps: raspsReducer,
    auth: authReducer,
    teachers: teachersReducer,
    predmets : predmetsReducer,
    groups : groupsReducer,
  },
});

export default store;
