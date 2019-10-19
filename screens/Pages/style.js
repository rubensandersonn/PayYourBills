import styled from "styled-components/native";
import { lightGray, danger, green } from "../../utils/colors";

export const Card = styled.View`
  border-color: ${lightGray};
  border-width: 1px;
  border-radius: 20px;
  width: 50%;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-right: 5px;
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: ${danger};
  border-color: ${lightGray};
  border-width: 1px;
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: ${green};
  border-color: ${lightGray};
  border-width: 1px;
  border-radius: 10px;
`;

export const ScrollList = styled.ScrollView`
  border-radius: 10px;
  max-height: 100%;
  height: 100%;
  width: 100%;
  padding: 5px;
  /* background: papayawhip; */
`;
