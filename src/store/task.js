import { createSlice } from "@reduxjs/toolkit";
import todosServise from "../services/toods.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    updated(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFaild(state, action) {
      state.isLoading = false;
    },
    create(state, action) {
      state.entities = [...state.entities, action.payload];
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { updated, remove, recived, taskRequested, taskRequestFaild, create } =
  actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosServise.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFaild());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(updated({ id: id, completed: true }));
};

export function titleChange(id) {
  return updated({ id: id, title: `New title for ${id}` });
}

export function taskDelete(id) {
  return remove({ id });
}

export const taskCreate = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosServise.create();
    dispatch(create({ ...data }));
  } catch (error) {
    dispatch(taskRequestFaild());
    dispatch(setError(error.message));
  }
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
