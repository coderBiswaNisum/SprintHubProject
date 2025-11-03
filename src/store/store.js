import { configureStore } from "@reduxjs/toolkit";
import createFolderFilesReducer from "../features/createFolderFilesSlice";
import navbarReducer from "../features/navbarSlice";
import openFileReducer from "../features/openFileSlice";
import breadcrumbReducer from "../features/breadcrumbSlice";

export const store = configureStore({
  reducer: {
    create: createFolderFilesReducer,
    navbarChange: navbarReducer,
    breacrumbTitle:breadcrumbReducer,
    changeFileLink: openFileReducer,
  },
});

export default store;
