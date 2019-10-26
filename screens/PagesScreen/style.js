import styled from "styled-components/native";
import { lightGray, danger, green } from "../../utils/colors";

export const Card = styled.TouchableOpacity`
  border-color: ${lightGray};
  border-width: 1px;
  border-radius: 20px;

  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-right: 5px;
  /* flex: 1; */
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: ${danger};
  border-color: ${lightGray};
  border-width: 1px;
  border-radius: 10px;
  padding: 12px;
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: ${green};
  border-color: ${lightGray};
  border-width: 1px;
  border-radius: 10px;
`;

export const ScrollList = styled.View`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  /* background: papayawhip; */
`;

export const WrapperRow = styled.SafeAreaView`
  width: 100%;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  flex: 1;
  margin-left: 2px;
`;

export const WrapperPage = styled.ScrollView`
  flex: 1;
`;
