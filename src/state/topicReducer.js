const initialState = {
  topics: [],
  fetchingTopic: false,
  lastTopicNameCreated: "",
  lastTopicColorCreated: "",
};

const topicReducer = (state = initialState, action = {}) => {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_TOPIC_START:
    case GET_TOPIC_START:
      newState.fetchingTopic = true;
      return newState;
    case CREATE_TOPIC_END:
      newState.fetchingTopic = false;
      newState.lastTopicNameCreated = action.data.name;
      newState.lastTopicColorCreated = action.data.color;
      return newState;
    case GET_TOPIC_END:
      newState.topics = action.data;
      newState.fetchingTopic = false;
      return newState;
    default:
      return state;
  }
};

export const CREATE_TOPIC_START = "CREATE_TOPIC_START";
export const GET_TOPIC_START = "GET_TOPIC_START";
export const GET_TOPIC_END = "GET_TOPIC_END";
export const CREATE_TOPIC_END = "CREATE_TOPIC_END";
export default topicReducer;
