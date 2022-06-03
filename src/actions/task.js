import { handleResponse } from "../utils/handleResponse";
import { LOAD_TASKS_START } from "../state/taskReducer";

export function loadTasks() {
  return (dispatch) => {
    dispatch({ type: LOAD_TASKS_START });

    const requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:3000/task", requestOptions)
      .then(handleResponse)
      .then((response) => {
        console.log(response);
      });
  };
}
