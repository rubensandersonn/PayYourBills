import React from "react";
import { View } from "react-native";
import { Card, Title, Subtitle } from "./style";

export default function Page(props) {
  const { title, totalBill, saldo, onPress } = props;

  return (
    <Card onPress={onPress}>
      <Title>{title}</Title>
      <Subtitle> - R$ {totalBill}</Subtitle>
      <Subtitle>R$ {saldo}</Subtitle>
    </Card>
  );
}
