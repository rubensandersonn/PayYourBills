import styled from "styled-components/native";
import { darkGray, gray, secondary } from "../../utils/colors";

export const Title = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${darkGray};
  font-weight: bold;
  background-color: transparent;
  margin: 0;
  padding: 0;
  width: 100%;
  /* flex: 1; */
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${gray};
`;

export const Card = styled.View`
  background-color: transparent;
  margin: 10px;
  align-items: center;
  justify-content: center;

  /* width: 80%; // sem relação */
  flex: 1;
`;
