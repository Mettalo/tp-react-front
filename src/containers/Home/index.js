//Redux
import { useSelector, useDispatch } from "react-redux";
import { loadTasks } from "../../actions/task";
//Style
import styled from "styled-components";
import color from "../../utils/theme";
//Local
import Menu from "../Menu";
import { useState } from "react";
//Views
import ListView from "../views/ListView";
import CalendarView from "../views/CalendarView";
import AddSection from "../views/AddSection";
import AddTask from "../views/AddTask";
import AddTopic from "../views/AddTopic";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${color.backgroundColor};
  color: white;
`;

const Header = styled.div`
  height: 6%;
  display: flex;
  color: ${color.primaryColor};
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  height: 100%;
  font-size: 2em;
  padding: 8px 30px;
  border-radius: 0px 0px 20px 20px;
  border-bottom: solid 2px ${color.primaryColor};
  border-right: solid 2px ${color.primaryColor};
  border-left: solid 2px ${color.primaryColor};
`;

const Body = styled.div`
  height: 86%;
  display: flex;
  justify-content: center;
`;

const Add = styled.div`
  position: absolute;
  display: flex;
  right: 5%;
  bottom: 10%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${color.primaryColor};
  color: ${color.backgroundColor};
  justify-content: center;
  align-items: center;
  font-size: 4em;
`;

const Span = styled.span`
  margin-bottom: 11px;
`;

const Home = () => {
  //State
  const [view, setView] = useState("list"); //list, calendar,
  const [addView, setAddView] = useState(false); //addSection, addTask, addTopic
  //Bind state
  const { tasks } = useSelector((state) => state.taskReducer);

  const displayAddView = () => {
    switch (addView) {
      case "addSection":
        return <AddSection setAddView={setAddView} />;
      case "addTask":
        return <AddTask setAddView={setAddView}/>;
      case "addTopic":
        return <AddTopic setAddView={setAddView}/>;
      default:
        return null;
    }
  };

  const displayView = () => {
    switch (view) {
      case "list":
        return <ListView />;
      case "calendar":
        return <CalendarView />;
      default:
        return <ListView />;
    }
  };

  return (
    <Container>
      <Header>
        <Title>ToDoLi</Title>
      </Header>
      <Body>
        {(addView && displayAddView()) || displayView()}
        {!addView && (
          <Add onClick={() => setAddView("addSection")}>
            <Span>+</Span>
          </Add>
        )}
      </Body>
      {!addView && <Menu view={view} setView={setView} />}
    </Container>
  );
};

export default Home;
