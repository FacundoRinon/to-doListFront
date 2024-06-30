import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  token: string;
  id: number;
  username: string;
  email: string;
  lists: any[];
  tasks: any[];
}

const initialState: StateType = {
  token: "",
  id: NaN,
  username: "",
  email: "",
  lists: [],
  tasks: [],
};

interface Task {
  task_id: number;
  title: string;
  description: string;
  dateToComplete: string;
  state: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setToken(state, action) {
      return action.payload;
    },
    removeToken(state, action) {
      return null;
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
} = actions;

export default reducer;
