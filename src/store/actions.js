import * as actionTypes from "./actionTypes";

export function taskComplete(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id: id, completed: true },
  };
}

export function titleChange(id) {
  return {
    type: actionTypes.taskUpdated,
    payload: { id: id, title: `New title for ${id}` },
  };
}

export function taskDelete(id) {
  return {
    type: actionTypes.taskDeleted,
    payload: { id: id },
  };
}
