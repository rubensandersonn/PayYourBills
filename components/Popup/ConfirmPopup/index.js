import React, { useCallback } from "react";
import { Text, View } from "react-native";
import Popup from "..";

const ConfirmPopup = props => {
  const { visible, onCancel, onConfirm, Message } = props;

  const Content = () =>
    useCallback(
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {Message ? <Text>{Mesage}</Text> : <Text>Tem Certeza?</Text>}
      </View>,
      [Message]
    );

  return (
    <Popup
      visible={visible}
      onCancel={onCancel}
      onConfirm={onConfirm}
      Content={Content}
    />
  );
};

export default ConfirmPopup;
