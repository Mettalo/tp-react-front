const initialState = {
  tasks: [],
  fetchingTask: false,
};

const taskReducer = (state = initialState, action = {}) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_TASKS_START:
      return newState;
    default:
      return state;
  }
};

export const LOAD_TASKS_START="LOAD_TASKS_START";
export default taskReducer;
