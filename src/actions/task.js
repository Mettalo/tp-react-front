import { handleResponse } from "../utils/handleResponse";
import {
  LOAD_TASKS_START,
  LOAD_TASKS_END,
  CREATE_TASK_START,
  CREATE_TASK_END,
  DELETE_TASKS_START,
} from "../state/taskReducer";
import API_ROOT from "../config";

export function loadTasks() {
  return (dispatch) => {
    dispatch({ type: LOAD_TASKS_START });

    const requestOptions = {
      method: "GET",
    };

    fetch(`${API_ROOT}/task`, requestOptions)
      .then(handleResponse)
      .then((response) => {
        dispatch({
          type: LOAD_TASKS_END,
          data: response,
        });
      });
  };
}

export function createTask(title, description, priority, topicId) {
  return (dispatch) => {
    dispatch({ type: CREATE_TASK_START });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        topicId,
      }),
    };
    fetch(`${API_ROOT}/task`, requestOptions)
      .then(handleResponse)
      .then((response) => {
        console.log(response)
        dispatch({
          type: CREATE_TASK_END,
          data: {title: response.title}
        });
      });
  };
}

export function deleteTasks(tasksToDelete) {
  return (dispatch) => {
    dispatch({ type: DELETE_TASKS_START });

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasks: tasksToDelete,
      }),
    };

    fetch(`${API_ROOT}/task`, requestOptions)
      .then(handleResponse)
      .then((response) => {
        dispatch({
          type: LOAD_TASKS_END,
          data: response,
        });
      });
  };
}
