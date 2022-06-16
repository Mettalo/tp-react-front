import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadTasks, deleteTasks } from "../../actions/task";
import { loadTopics } from "../../actions/topic";
import Delete from "../../img/delete.png";

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  overflow: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TopicSection = styled.div`
  display: flex;
  margin: 5px 10px;
  border-left: solid 5px ${(props) => props.color};
  padding: 0px 10px;
  flex-direction: column;
`;

const TopicTitle = styled.div`
  font-size: 1.2em;
  display: flex;
  color: ${(props) => props.color};
  align-items: center;
`;

const TaskSection = styled.div`
  display: flex;
  margin: 10px 15px;
  flex-direction: column;
`;

const Task = styled.div`
  display: flex;
  margin: 5px 0px;
  align-items: center;
`;

const TaskTitle = styled.span`
  margin-left: 4px;
  ${(props) =>
    props.delete &&
    `
  text-decoration: line-through
  `}
`;

const CheckBoxStyled = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

const ListView = () => {
  //State
  const [tree, setTree] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState([]);
  //Bind state
  const { topics } = useSelector((state) => state.topicReducer);
  const { tasks } = useSelector((state) => state.taskReducer);
  //Bind actions
  const dispatch = useDispatch();
  const getTasks = () => dispatch(loadTasks());
  const getTopics = () => dispatch(loadTopics());
  const deleteTasksAction = () => dispatch(deleteTasks(taskToDelete));

  useEffect(() => {
    getTasks();
    getTopics();
  }, []);

  useEffect(() => {
    if (topics.length && tasks.length) {
      let newTree = [];
      topics.map((topic) => {
        const treeTopic = { name: topic.name, color: topic.color, tasks: [] };
        const topicId = topic._id;
        tasks.map((task) => {
          if (task.topicId == topicId) {
            treeTopic.tasks.push(task);
          }
        });
        if (treeTopic.tasks.length) {
          newTree.push(treeTopic);
        }
      });
      setTree(newTree);
    }
  }, [topics, tasks]);

  const addTaskToDelete = (taskId) => {
    const newTaskToDelete = [...taskToDelete];
    if (newTaskToDelete.includes(taskId)) {
      const index = newTaskToDelete.findIndex((id) => id == taskId);
      newTaskToDelete.splice(index, 1);
    } else {
      newTaskToDelete.push(taskId);
    }
    setTaskToDelete(newTaskToDelete);
  };

  return (
    <Container>
      <Content>
        {tree &&
          tree.map((topic) => {
            return (
              <TopicSection color={topic.color}>
                <TopicTitle color={topic.color}>
                  <>
                    {topic.name}
                    {topic.tasks.find((task) =>
                      taskToDelete.includes(task._id)
                    ) && (
                      <Img src={Delete} onClick={() => deleteTasksAction()} />
                    )}
                  </>
                </TopicTitle>
                <TaskSection>
                  {topic.tasks.map((task) => {
                    return (
                      <Task onClick={() => addTaskToDelete(task._id)}>
                        <CheckBoxStyled
                          type="checkbox"
                          checked={taskToDelete.includes(task._id)}
                        />
                        <TaskTitle delete={taskToDelete.includes(task._id)}>
                          {task.title}
                        </TaskTitle>
                      </Task>
                    );
                  })}
                </TaskSection>
              </TopicSection>
            );
          })}
      </Content>
    </Container>
  );
};

export default ListView;
