import styled from "styled-components";

//Components
import { GoBack, GobackSection } from "../../components/GoBack";
import { Container } from "../../components/Container";
import color from "../../utils/theme";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { loadTopics } from "../../actions/topic";
import { createTask } from "../../actions/task";
import { useEffect, useState } from "react";

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 95%;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 1.3em;
  color: #fffff;
  margin-top: 30px;
  margin-left: 20px;
`;

const Input = styled.input`
  width: 85%;
  height: 4%;
  border: solid 1px ${color.primaryColor};
  background-color: ${color.backgroundColor};
  color: #ffffff;
  margin-top: 10px;
  margin-left: 20px;
`;

const TextArea = styled.textarea`
  width: 85%;
  height: 10%;
  border: solid 1px ${color.primaryColor};
  background-color: ${color.backgroundColor};
  color: #ffffff;
  margin-top: 10px;
  margin-left: 20px;
`;

const SelectSection = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectStyled = styled(Select)`
  width: 88%;
  height: 100%
  border: solid 1px ${color.primaryColor};
  color:${color.primaryColor};
  background: ${color.backgroundColor};
`;

const ValidateSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
`;

const Validate = styled.div`
  width: 60%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px ${color.primaryColor};
  background-color: ${color.primaryColor};
  color: ${color.backgroundColor};
`;

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: color.backgroundColor,
    color: "#ffffff",
  }),
  option: (base, state) => ({
    ...base,
    background: color.backgroundColor,
    color: "#ffffff",
  }),
  menu: (base, state) => ({
    ...base,
    background: color.backgroundColor,
    color: color.primaryColor,
  }),
  singleValue: (base, state) => ({
    ...base,
    background: color.backgroundColor,
    color: "#ffffff",
  }),
};

const AddTask = ({ setAddView }) => {
  //State
  const [topicsOptions, setTopicsOptions] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(3);
  const [topicSelected, setTopicSelected] = useState("");
  //Bind state
  const { topics } = useSelector((state) => state.topicReducer);
  //Bind actions
  const dispatch = useDispatch();
  const get = () => dispatch(loadTopics());
  const create = () =>
    dispatch(createTask(name, description, priority, topicSelected));
  const options = [
    {
      value: 1,
      label: "Forte",
    },
    { value: 2, label: "Moyen" },
    { value: 3, label: "Faible" },
  ];

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    const topicsOptions = topics.map((option) => {
      return { label: option.name, value: option._id };
    });
    setTopicsOptions(topicsOptions);
  }, [topics]);

  return (
    <Container>
      <GobackSection>
        <GoBack onClick={() => setAddView("addSection")}>{"< Retour"}</GoBack>
      </GobackSection>
      <Content>
        <Name>Nom de la tâche</Name>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Name>Description de la tâche</Name>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Name>Priorité</Name>
        <SelectSection>
          <SelectStyled
            options={options}
            styles={customStyles}
            placeholder={"Priorité"}
            onChange={(opt) => setPriority(opt.value)}
            value={options.find((opt) => {
              return opt.value == priority;
            })}
          />
        </SelectSection>
        <Name>Thème associé</Name>
        <SelectSection>
          <SelectStyled
            options={topicsOptions}
            styles={customStyles}
            placeholder={"Thème"}
            onChange={(opt) => setTopicSelected(opt.value)}
            value={topicsOptions.find((opt) => {
              return opt.value == topicSelected;
            })}
          />
        </SelectSection>
        <ValidateSection>
          <Validate onClick={() => create()}>Créer la tâche</Validate>
        </ValidateSection>
      </Content>
    </Container>
  );
};

export default AddTask;
