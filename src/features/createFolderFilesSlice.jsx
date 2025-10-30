import { createSlice } from "@reduxjs/toolkit";

let initialState = [
  {
    type: "folder",
    name: "Albertson",
    children: [
      {
        type: "folder",
        name: "Sub Folder",
        children: [
          { type: "file", name: "Team" },
          { type: "file", name: "Work Plan" },
          {
        type: "folder",
        name: "Sub Folder2",
        children: [
          { type: "file", name: "Team 2 " },
          { type: "file", name: "Work Plan 2" },
        ],
      }
        ],
      },
      {
        type: "file",
        name: "Work Progress",
      },
    ],
  },
  {
    type: "folder",
    name: "MSI",
    children: [{ type: "file", name: "Project Details" }],
  },
  {
    type: "file",
    name: "Summery File",
  },
  {
    type: "folder",
    name: "GAP",
  },
];

const createFolderFilesSlice = createSlice({
  name: "Create Folder and Files",
  initialState,
  reducers: {
    createFolder(state, action) {
      const nameEntered = prompt("Enter Your Folder Name:");
      const object = action.payload;
      state.push({ type: "folder", name: nameEntered, });
    },
    createFile(state, action) {
       const fileNameEntered = prompt("Enter Your File Name:");
      const objectVal = action.payload;
      console.log(objectVal)
      objectVal?.push({ type: "file", name: fileNameEntered, });
    },
  },
});

export const { createFile, createFolder } = createFolderFilesSlice.actions;
export default createFolderFilesSlice.reducer;
