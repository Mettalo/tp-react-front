//import React from 'react';
import { Provider } from "react-redux";
import Home from "./containers/Home";
import taskReducer from "./state/taskReducer";
import { configureStore } from "@reduxjs/toolkit";

function App() {
  const store = configureStore({
    reducer: {taskReducer},
  });

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
