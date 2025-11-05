import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  value: [
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
          url: "https://docs.google.com/document/d/1cgnD9N2TPCvFOpk8AW4-zMVDmLLJoWKB/edit?usp=sharing&ouid=102042161869103939919&rtpof=true&sd=true",
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
      children: [],
    },
  ],
};
// let maxId = 100;

function insertInto(arrVal, gotId, newObj) {
  let arrVal2 = arrVal?.map((v) => {
    if (v.id === gotId) {
      v.children.push(newObj);
      console.log(v.children);
    }
    if (v.children && v.children.length > 0) {
      insertInto(v.children, gotId, newObj);
    }
    return v;
  });
  return arrVal2;
}

function updateLink(arr,targetId){

 let arr2 = arr.map(v=> {
  if(v.id===targetId){
    const newLink = prompt(`Your current link is:\n\n${v.url}\n\n Enter the New Link below and press OK to Update:`)
    newLink && (v.url = newLink)
  }
  if(v.children && v.children.length>0){
    updateLink(v.children,targetId)
  }
  return v
 }

)

return arr2
}

const createFolderFilesSlice = createSlice({
  name: "Create Folder and Files",
  initialState,
  reducers: {
    createFolder(state, action) {
      let fileNameEntered = prompt("Enter Your Folder Name:");
      const newVal = insertInto(state.value, action.payload, {
        id: Math.floor(Math.random() * 10000),
        type: "folder",
        name: fileNameEntered,
        children: [],
      });
      console.log(newVal);
      state.value = newVal;
    },
    createFile(state, action) {
      const fileNameEntered = prompt("Enter Your File Name:");
      const objectVal = action.payload;
      const newFile = {
        id: Math.floor(Math.random() * 10000),
        type: "file",
        url:"https://example.com/team",
        name: fileNameEntered,
      };
      const newVal = insertInto(state.value, objectVal, newFile);
      state.value = newVal;
    },
    updateFileLink(state,action){
      let targetId = action.payload
      state.value = updateLink(state.value,targetId)
    },
    createNewProject(state){
      let newProjectName = prompt('Enter the New Project Name:')
    },
    createProjectFile(state){
      let newPFileName = prompt('Enter the New File Name:')
    }
  },
});

export const { createFile, createFolder,updateFileLink } = createFolderFilesSlice.actions;
export default createFolderFilesSlice.reducer;
