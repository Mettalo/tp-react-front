import { useState } from "react";
import styled from "styled-components";
import color from "../../utils/theme";

const Container = styled.div`
  height: 8%;
  display: flex;
  overflow: hidden;
`;

const Option = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  border-top: ${color.primaryColor} solid 1px;
  color: ${color.primaryColor};
  ${(props) =>
    props.isSelected &&
    `
    background-color: ${color.primaryColor};
    color: ${color.backgroundColor}
  `}
`;

const Menu = ({ view, setView }) => {
  return (
    <Container>
      <Option onClick={() => setView("list")} isSelected={view == "list"}>
        Liste
      </Option>
      <Option
        onClick={() => setView("calendar")}
        isSelected={view == "calendar"}
      >
        Calendrier
      </Option>
    </Container>
  );
};

export default Menu;
