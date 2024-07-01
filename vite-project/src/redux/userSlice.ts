import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  token: string;
  id: number;
  username: string;
  email: string;
  lists: {
    list_id: number;
    title: string;
    type: string;
    deadline: string;
    state: string;
    creation_date: string;
  }[];
  tasks: {
    task_id: number;
    title: string;
    description: string;
    dateToComplete: string;
    state: string;
  }[];
  fastList: {
    id: number;
    content: string;
  }[];
}

const initialState: State = {
  token: "",
  id: 0,
  username: "",
  email: "",
  lists: [],
  tasks: [],
  fastList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      return action.payload;
    },
    removeToken(state, action) {
      return initialState;
    },
    addList(state, action) {
      if (state === null || typeof state !== "object") {
        return state;
      }
      const newList = action.payload;
      const updatedLists = [newList, ...state.lists];

      const newUser = {
        ...state,
        lists: updatedLists,
      };
      return newUser;
    },
    addTask(state, action) {
      if (state === null || typeof state !== "object") {
        return state;
      }

      const newTask = action.payload;
      const updatedTasks = [newTask, ...state.tasks];

      const newUser = {
        ...state,
        tasks: updatedTasks,
      };
      return newUser;
    },
    updateTasks(state, action) {
      if (state === null || typeof state !== "object") {
        return state;
      }
      const newTasks = action.payload;
      const newUser = {
        ...state,
        tasks: newTasks,
      };
      return newUser;
    },
    deleteList(state, action) {
      const listToDelete = action.payload;
      if (state === null || typeof state !== "object") {
        return state;
      }
      const updatedLists = state.lists.filter(
        (list) => list.list_id !== listToDelete
      );
      const updatedUser = {
        ...state,
        lists: updatedLists,
      };
      return updatedUser;
    },
    deleteTask(state, action) {
      const taskIdToDelete = action.payload;

      if (state === null || typeof state !== "object") {
        return state;
      }
      const updatedTasks = state.tasks.filter(
        (task) => task.task_id !== taskIdToDelete
      );

      const updatedUser = {
        ...state,
        tasks: updatedTasks,
      };
      return updatedUser;
    },
    addFast(state, action) {
      const newFast = action.payload;
      const updatedFast = [newFast, ...state.fastList];

      const updatedUser = {
        ...state,
        fastList: updatedFast,
      };

      return updatedUser;
    },
    deleteFast(state, action) {
      const indexToDelete = action.payload;
      state.fastList.splice(indexToDelete, 1);
    },
  },
});

const { actions, reducer } = userSlice;
export const {
  setToken,
  removeToken,
  addList,
  addTask,
  updateTasks,
  deleteList,
  deleteTask,
  addFast,
  deleteFast,
} = actions;

export default reducer;
