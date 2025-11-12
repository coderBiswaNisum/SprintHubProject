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
      children: [
        {
          id: 15,
          type: "file",
          name: "App Features",
          url: "https://docs.google.com/document/d/18bM0PKyPLHEDzaTGyK-pMfcujhFSGki-_BpKJOW3cYU/edit?usp=sharing",
        },
        {
          id: 16,
          type: "file",
          name: "GAP PowerBI Report",
          url: "https://app.powerbi.com/reportEmbed?reportId=7c43af94-4751-4aa7-be8c-31ddcf2f102f&autoAuth=true&ctid=06408ebc-5eb8-4b0d-827f-76dd3b58bc84",
        },
      ],
    },
  ],
};

function insertInto(arrVal, gotId, newObj) {
  if (gotId === 0) {
    arrVal.push(newObj);
    return arrVal;
  }
  let arrVal2 = arrVal?.map((v) => {
    if (v.id === gotId) {
      v.children.push(newObj);
    }
    if (v.children && v.children.length > 0) {
      insertInto(v.children, gotId, newObj);
    }
    return v;
  });
  return arrVal2;
}

function updateLink(arr, targetId) {
  let arr2 = arr.map((v) => {
    if (v.id === targetId) {
      const newLink = prompt(
        `Your current link is:\n\n${v.url}\n\n Enter the New Link below and press OK to Update:`
      );
      newLink && (v.url = newLink);
    }
    if (v.children && v.children.length > 0) {
      updateLink(v.children, targetId);
    }
    return v;
  });

  return arr2;
}
function renameById(arr, targetId) {
  let arr2 = arr.map((v) => {
    if (v.id === targetId) {
      const newName = prompt(
        `Your current File/Folder Name is:\n\n${v.name}\n\n Enter the New Name below and press OK to Update:`
      );
      newName && (v.name = newName);
    }
    if (v.children && v.children.length > 0) {
      renameById(v.children, targetId);
    }
    return v;
  });

  return arr2;
}

function deleteById(arr, targetId) {
  arr.forEach((val, i) => {
    if (val.id === targetId) {
      let confirmByUser = confirm("Are you sure, you want to delete it?");
      confirmByUser && arr.splice(i, 1);
    }
    val.children && deleteById(val.children,targetId)
  });
  return arr;

  // arr.map((v) => console.log(v.id));
}

const createFolderFilesSlice = createSlice({
  name: "Create Folder and Files",
  initialState,
  reducers: {
    createFolder(state, action) {
      let currentFolderId =  Math.floor(Math.random() * 10000)
      let fileNameEntered = prompt("Enter Your Folder Name:");
      const newVal = insertInto(state.value, action.payload, {
        id:currentFolderId,
        type: "folder",
        name: fileNameEntered,
        children: [],
      });
      state.value = newVal;
      const projectTeamFile = insertInto(state.value,currentFolderId,{
        id: Math.floor(Math.random() * 10000),
        type: "file",
        url: "https://example.com/",
        name: 'Project Team',
      })

      state.value = projectTeamFile
       const projectPlanFile = insertInto(state.value,currentFolderId,{
        id: Math.floor(Math.random() * 10000),
        type: "file",
        url: "https://example.com/",
        name: 'Project Plan',
      })

      state.value = projectPlanFile
       const projectDashboardFile = insertInto(state.value,currentFolderId,{
        id: Math.floor(Math.random() * 10000),
        type: "file",
        url: "https://example.com/",
        name: 'Project Dashboard',
      })

      state.value = projectDashboardFile
    },
    createFile(state, action) {
      const fileNameEntered = prompt("Enter Your File Name:");
      const objectVal = action.payload;
      const newFile = {
        id: Math.floor(Math.random() * 10000),
        type: "file",
        url: "https://example.com/",
        name: fileNameEntered,
      };
      const newVal = insertInto(state.value, objectVal, newFile);
      state.value = newVal;
    },

    updateFileLink(state, action) {
      let targetId = action.payload;
      state.value = updateLink(state.value, targetId);
    },
    renameFile(state, action) {
      let targetId = action.payload;
      state.value = renameById(state.value, targetId);
    },
    deleteFile(state, action) {
      let targetId = action.payload;
      // state.value = deleteById(state.value,targetId)
      deleteById(state.value, targetId);
    },
  },
});

export const {
  createFile,
  createFolder,
  updateFileLink,
  renameFile,
  deleteFile,
} = createFolderFilesSlice.actions;
export default createFolderFilesSlice.reducer;
