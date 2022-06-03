import React from "react";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { loadTasks } from "../../actions/task";
//Style
import styled from "styled-components";
import color from "../../utils/theme";

const Container = styled.div`
  width: 100%;
  height: 56em;
  min-height: 100%;
  display: flex;
  background-color: ${color.backgroundColor};
  color: white;
`;

const Button = styled.div`
  width: 50px;
  height: 20px;
  border: solid 1px white;
  background-color: white;
`;

const Home = () => {
  //Bind state
  const { tasks } = useSelector((state) => state.taskReducer);
  //Bind actions
  const dispatch = useDispatch();
  const getTasks = () => dispatch(loadTasks());

  return (
    <Container>
      <Button onClick={() => getTasks()}>Hey</Button>
    </Container>
  );
};

export default Home;
