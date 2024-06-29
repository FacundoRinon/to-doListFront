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
    addTask(state, action) {
      if (state === null || typeof state !== "object") {
        return state;
      }

      const newTask = action.payload;
      const updatedTasks = [...state.tasks, newTask];

      const newUser = {
        ...state,
        tasks: updatedTasks,
      };
      return newUser;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setToken, removeToken, addTask } = actions;

export default reducer;
