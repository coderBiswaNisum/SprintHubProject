import { configureStore } from "@reduxjs/toolkit";
import createFolderFilesReducer from "../features/createFolderFilesSlice";
import navbarReducer from "../features/navbarSlice";

export const store = configureStore({
  reducer: {
    create: createFolderFilesReducer,
    navbarChange: navbarReducer,
  },
});

export default store;
