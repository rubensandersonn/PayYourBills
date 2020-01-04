import styled from "styled-components/native";

import {
  darkGray,
  gray,
  lightGray,
  danger,
  green
} from "../../../utils/colors";

export const Card = styled.View`
  border-color: ${lightGray};
  border-width: 1px;
  border-radius: 20px;
  flex-direction: row;

  /* align-items: center; */
  justify-content: center;
  margin-top: 5px;
  margin-right: 5px;
  width: 98%;
  /* flex: 1; */
`;

export const DeleteButton = styled.TouchableOpacity`
  background-color: ${danger};
  border-color: ${lightGray};
  border-width: 1px;
  border-radius: 10px;
  padding: 12px;
  margin-top: 5px;
  margin-right: 5px;
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

export const Title = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${darkGray};
  font-weight: bold;
  background-color: transparent;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${gray};
`;

export const CardPage = styled.TouchableOpacity`
  background-color: transparent;
  margin: 2%;
  padding-left: 8%;
  padding-top: 8%;
  padding-bottom: 8%;
  align-items: center;
  justify-content: center;

  /* width: 80%; */
  flex: 1;
`;
