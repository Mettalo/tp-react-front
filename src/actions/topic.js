import { handleResponse } from "../utils/handleResponse";
import {
  CREATE_TOPIC_START,
  CREATE_TOPIC_END,
  GET_TOPIC_START,
  GET_TOPIC_END,
} from "../state/topicReducer";

export function createTopic(name, color) {
  return (dispatch) => {
    dispatch({ type: CREATE_TOPIC_START });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        color,
      }),
    };

    fetch("http://localhost:3000/topic", requestOptions)
      .then(handleResponse)
      .then((response) => {
        dispatch({
          type: CREATE_TOPIC_END,
          data: { name: response.name, color: response.color },
        });
      });
  };
}

export function loadTopics() {
  return (dispatch) => {
    dispatch({ type: GET_TOPIC_START });

    const requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:3000/topic", requestOptions)
      .then(handleResponse)
      .then((response) => {
        dispatch({
          type: GET_TOPIC_END,
          data: response,
        });
      });
  };
}
