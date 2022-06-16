const initialState = {
  tasks: [],
  fetchingTask: false,
};

const taskReducer = (state = initialState, action = {}) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_TASKS_START:
    case DELETE_TASKS_START:
      newState.fetchingTask = true;
      return newState;
    case LOAD_TASKS_END:
      newState.fetchingTask = false;
      newState.tasks = action.data;
      return newState;
    case CREATE_TASK_START:
      newState.fetchingTask = true;
      return newState;
    case CREATE_TASK_END:
      newState.fetchingTask = false;
      return newState;

    default:
      return state;
  }
};

export const LOAD_TASKS_START = "LOAD_TASKS_START";
export const LOAD_TASKS_END = "LOAD_TASKS_END";
export const CREATE_TASK_START = "CREATE_TASK_START";
export const CREATE_TASK_END = "CREATE_TASK_END";
export const DELETE_TASKS_START = "DELETE_TASKS_START";
export default taskReducer;
