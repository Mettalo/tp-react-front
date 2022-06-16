import styled from "styled-components";

//Actions
import { createTopic } from "../../actions/topic";

//Components
import { GoBack, GobackSection } from "../../components/GoBack";
import { Container } from "../../components/Container";
import color from "../../utils/theme";
import { CirclePicker } from "react-color";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 95%;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 1.3em;
  color: ${color.primaryColor};
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

const ColorSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
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

const IsCreateSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  border: solid 1px ${(props) => props.color || color.primaryColor};
  background-color: ${(props) => props.color || color.primaryColor};
  color: white;
`;

const AddTopic = ({ setAddView }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#f44336");

  //Bind state
  const { fetchingTopic, lastTopicNameCreated, lastTopicColorCreated } =
    useSelector((state) => state.topicReducer);
  //Bind actions
  const dispatch = useDispatch();
  const create = () => dispatch(createTopic(name, color));

  return (
    <Container>
      {(fetchingTopic && <Content>En cours de création...</Content>) || (
        <>
          <GobackSection>
            <GoBack onClick={() => setAddView("addSection")}>
              {"< Retour"}
            </GoBack>
          </GobackSection>
          <Content>
            <Name>Nom du thème</Name>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Name>Couleur du thème</Name>
            <ColorSection>
              <CirclePicker
                onChange={(color) => setColor(color.hex)}
                color={color}
              />
            </ColorSection>
            <ValidateSection>
              <Validate onClick={() => create()}>
                Créer un nouveau thème
              </Validate>
            </ValidateSection>
            {lastTopicNameCreated && lastTopicColorCreated && (
              <IsCreateSection color={lastTopicColorCreated}>
                Le thème {lastTopicNameCreated} a bien été crée
              </IsCreateSection>
            )}
          </Content>
        </>
      )}
    </Container>
  );
};

export default AddTopic;
