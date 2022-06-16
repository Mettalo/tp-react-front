import styled from "styled-components";
import color from "../../utils/theme";
import Task from "../../img/task.png";
import Theme from "../../img/theme.png";

//Components
import { GoBack, GobackSection } from "../../components/GoBack";
import { Container } from "../../components/Container";

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 95%;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

const Option = styled.div`
  display: flex;
  width: 45%;
  height: 20%;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  border: solid 1px ${color.primaryColor};
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
`;

const Title = styled.span`
  font-size: 2em;
  color: ${color.primaryColor};
`;

const AddSection = ({ setAddView }) => {
  return (
    <Container>
      <GobackSection>
        <GoBack onClick={() => setAddView(false)}>{`< Retour`}</GoBack>
      </GobackSection>
      <Content>
        <Title>Ajouter ...</Title>
        <Option onClick={() => setAddView("addTask")}>
          <Img src={Task} />
          <span>Une tâche</span>
        </Option>
        <Option onClick={() => setAddView("addTopic")}>
          <Img src={Theme} />
          <span>Un thème</span>
        </Option>
      </Content>
    </Container>
  );
};

export default AddSection;
