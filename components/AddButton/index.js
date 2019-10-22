import React from "react";
import { View } from "react-native";
import { RoundButton } from "../../utils/styled";

import Icon from "react-native-vector-icons/FontAwesome";

export default function AddButton(props) {
  return (
    <RoundButton
      style={{ position: "absolute", bottom: 10, right: 10 }}
      onPress={props.onPress}
    >
      <Icon name="plus" size={14} color="white" />
    </RoundButton>
  );
}
