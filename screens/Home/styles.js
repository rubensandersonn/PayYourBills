import styled from "styled-components/native";
import {
  lightGray,
  primaryEnd,
  gray,
  lightGreen,
  danger,
  green,
  darkGray,
  secondary
} from "../../utils/colors";

// === TEXT ===

export const TitlePage = styled.Text`
  text-align: center;
  font-size: 20px;
  color: palevioletred;
  font-weight: bold;
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const PinkTitle = styled.Text`
  font-size: 20px;
  color: ${secondary};
  font-weight: bold;
  margin-bottom: 4px;
  margin-top: 7px;
  margin-left: 15px;
`;

export const Title = styled.Text`
  color: ${gray};
  font-size: 17px;
  font-weight: bold;
  margin: 15px;
`;

export const TitlePopup = styled.Text`
  color: ${gray};
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const RText = styled.Text`
  color: ${gray};
  font-size: 17px;
  margin-bottom: 15px;
`;

export const Total = styled.Text`
  color: ${darkGray};
  font-weight: bold;
  font-size: 17px;
  margin-left: 2%;
  padding: 1%;
`;

// === WRAPPERS ===

export const Row = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* background: papayawhip; */
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.KeyboardAvoidingView`
  padding: 4px;

  flex: 1;
  /* background: papayawhip; */
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const WrapperPopup = styled.KeyboardAvoidingView`
  flex: 1;
  max-height: 230px;
`;

export const WrapperList = styled.ScrollView`
  margin: 10px;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-radius: 10px;
  border-top-color: ${lightGray};
  border-bottom-color: ${lightGray};
  min-height: 55%;
  height: 55%;
  width: 100%;
  /* background: papayawhip; */
`;

export const WrapperForm = styled.View`
  padding: 10px;
  margin: 10px;
  margin-right: 20px;
  border-width: 1px;
  border-color: ${lightGray};
  border-radius: 5px;
`;

// === BUTTONS ===

export const AddButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${primaryEnd};
  position: absolute;
  bottom: 15px;
  right: 15px;
  margin: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const AddNewBillButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${green};
  align-self: flex-end;
  margin: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
export const CancelNewBillButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${primaryEnd};
  align-self: flex-end;
  margin: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const EditMoneyButton = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
  border-radius: 10px;
  background-color: ${gray};
  right: 10px;
  top: 8px;
  margin-left: 10px;

  justify-content: center;
  align-items: center;
`;
export const SaveButton = styled.TouchableOpacity`
  width: 60px;
  height: 30px;
  border-radius: 10px;
  background-color: ${primaryEnd};
  position: absolute;
  right: 10px;

  margin-left: 10px;
  margin-right: 10px;
  margin-top: 13px;
  padding: 5px 0px 5px 0px;
  justify-content: center;
  align-items: center;
`;

export const TextAddButton = styled.Text`
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: #fefefe;
`;

// === INPUTS ===

export const TextInputName = styled.TextInput`
  border-width: 1px;
  border-color: ${lightGray};
  font-size: 16px;

  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  min-width: 80%;
`;
export const TextInputValue = styled.TextInput`
  border-width: 1px;
  border-color: ${lightGray};
  font-size: 16px;

  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  min-width: 80%;
`;
