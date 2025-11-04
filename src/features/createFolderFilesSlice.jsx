import { createSlice } from "@reduxjs/toolkit";

let initialState = {value:[
  {
    id: 1,
    type: "folder",
    name: "Albertson",
    children: [
      {
        id: 2,
        type: "folder",
        name: "Sub Folder",
        children: [
          {
            id: 3,
            type: "file",
            name: "Team",
            url: "https://example.com/team",
          },
          {
            id: 4,
            type: "file",
            name: "Work Plan",
            url: "https://example.com/work-plan",
          },
          {
            id: 5,
            type: "folder",
            name: "Sub Folder2",
            children: [
              {
                id: 6,
                type: "file",
                name: "Team 2",
                url: "https://example.com/team-2",
              },
              {
                id: 7,
                type: "file",
                name: "Work Plan 2",
                url: "https://example.com/work-plan-2",
              },
            ],
          },
        ],
      },
      {
        id: 8,
        type: "file",
        name: "Work Progress",
        url: "https://example.com/work-progress",
      },
    ],
  },
  {
    id: 9,
    type: "folder",
    name: "MSI",
    children: [
      {
        id: 10,
        type: "file",
        name: "Project Details",
        url: "https://example.com/project-details",
      },
    ],
  },
  {
    id: 11,
    type: "file",
    name: "Sprint _Hub",
    url: "https://docs.google.com/spreadsheets/d/1tUO5g6odx8j1_wCYe6_qFrTc67p2PXPNVHlQ8iwhj3o/edit?usp=sharing",
  },
  {
    id: 12,
    type: "folder",
    name: "GAP",
  },
]};
let maxId = 100;

function insertInto(arrVal,gotId,newObj){
  // let tempArr = [...arrVal]
  console.log(arrVal)
arrVal.forEach((v,i) => {
  if(v.id === gotId){
    let parentArr = arrVal[i].children;
    parentArr.push(newObj)
  }
  if(v.children&&v.children.length>0){
    insertInto(v.children,gotId,newObj)
  }
})
}

const createFolderFilesSlice = createSlice({
  name: "Create Folder and Files",
  initialState,
  reducers: {
    createFolder(state, action) {
      maxId +=1;
      const nameEntered = prompt("Enter Your Folder Name:");
      // const objectVal = action.payload;
      // const newFolder = {id:maxId,type:'folder',name:nameEntered,children:[]}
      const arrr = state.value
      const newInitialState = [...arrr]
      // console.log("initialState:",state.value,'targetId:',action.payload,"newObject:",{id:maxId,type:'folder',name:nameEntered,children:[]})
      insertInto(newInitialState,action.payload,{id:maxId,type:'folder',name:nameEntered,children:[]})
      // console.log(state.value)
    },
    createFile(state, action) {
            maxId +=1;
      const fileNameEntered = prompt("Enter Your File Name:");
      const objectVal = action.payload;
      const newFile = {id:maxId,type:'file',name:fileNameEntered,}
      insertInto(initialState,objectVal,newFile)
    },
  },
});

export const { createFile, createFolder } = createFolderFilesSlice.actions;
export default createFolderFilesSlice.reducer;
