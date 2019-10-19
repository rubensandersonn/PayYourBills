import styled from "styled-components/native";
import { darkGray, gray } from "../../utils/colors";

export const Title = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${darkGray};
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${gray};
`;

export const Card = styled.TouchableOpacity`
  background-color: white;

  height: 25%;
  margin: 10px;
`;
